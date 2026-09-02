#!/usr/bin/env bash
# Sourced by alanwalton-ios-seam, in the shell that runs it, and cut from
# 08-shortcuts-and-keychain.sh when that seam moved into akasha. It reads the names
# the seam set and is not a program of its own.
if [[ "$DEVICE_SECRET_ENABLED" == "1" ]]; then
{
cat <<'SWIFT_DEVICE_SECRET_HEAD'

// ===== device-secret keychain seam ==========================================
// Per-device `dvs_v1_…` credential store (#15933). Keychain, never app-group
// UserDefaults: this is a credential, and UserDefaults is a plist in the container
// with no at-rest protection. ONE item per device — fixed service, account = the
// OWNING Supabase user id, value = the raw secret — written delete-all-then-add.
//
// The one-item invariant is what lets a headless App Intent query by SERVICE ALONE
// (it holds no session, so it has no user id to query with). Keying the account on
// the user id closes a cross-user hole: the server resolves a presented secret to the
// MINTING user, so a second identity inheriting the first's item would silently write
// its health data into the first user's rows, with no error raised anywhere.
enum DeviceSecretKeychain {
SWIFT_DEVICE_SECRET_HEAD
cat <<SWIFT_DEVICE_SECRET_PINS
    static let service = "$DEVICE_SECRET_SERVICE"
    // The access group is the development team joined to the bundle id, which is what Xcode
    // expands the AppIdentifierPrefix entitlement on the alanwalton-app program to. Pinned so
    // the credential home is stable and moving the intent into an app extension later is an
    // entitlement add, not a migration. Both values arrive from the app page as this run
    // exports them, so nothing here states one.
    static let accessGroup = "$KEYCHAIN_ACCESS_GROUP"
SWIFT_DEVICE_SECRET_PINS
cat <<'SWIFT_DEVICE_SECRET'

    // Which keychain domain an operation actually used. A SIGNED build must always
    // report `pinned`. An UNSIGNED simulator build (CODE_SIGNING_ALLOWED=NO in
    // build-sim.sh) carries no entitlements and is refused errSecMissingEntitlement, so
    // it falls back to the app's default domain — the only way this credential path is
    // exercisable on the one agent-runnable surface there is. Reported, never silent:
    // a signed build reporting `default` would be a real entitlement regression.
    enum Domain: String {
        case pinned
        case fallback = "default"
    }

    private static func baseQuery(_ domain: Domain) -> [String: Any] {
        var query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: service,
        ]
        if domain == .pinned {
            query[kSecAttrAccessGroup as String] = accessGroup
        }
        return query
    }

    // First 8 hex chars of SHA-256 over the stored value. Lets a round-trip be PROVEN
    // without ever handing the plaintext back to the web view; 8 hex chars of a digest
    // over a 256-bit CSPRNG value identify the item without narrowing it.
    private static func fingerprint(_ value: String) -> String {
        let digest = SHA256.hash(data: Data(value.utf8))
        let hex = digest.map { String(format: "%02x", $0) }.joined()
        return String(hex.prefix(8))
    }

    /// Delete every item for this service in BOTH domains. Sign-out's safety half —
    /// it needs no credential, so it cannot fail for auth reasons — and the delete leg
    /// of store()'s upsert. Thorough by design: a copy left in the other domain would
    /// be exactly the live-secret-on-a-signed-out-device this is meant to prevent.
    @discardableResult
    static func clear() -> Bool {
        var ok = true
        for domain in [Domain.pinned, Domain.fallback] {
            let status = SecItemDelete(baseQuery(domain) as CFDictionary)
            if status != errSecSuccess, status != errSecItemNotFound,
               status != errSecMissingEntitlement {
                ok = false
                NSLog("[device-secret] keychain delete failed in \(domain.rawValue) (status \(status))")
            }
        }
        return ok
    }

    /// Store the freshly minted secret for `userID`, replacing whatever was there.
    /// Returns the domain used, or nil on failure — and a failure is FINAL: the caller
    /// discards the plaintext rather than retrying, because the server keeps only a
    /// SHA-256 and there is no read-back by design.
    static func store(secret: String, userID: String) -> Domain? {
        clear()
        var attributes: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: service,
            kSecAttrAccount as String: userID,
            kSecValueData as String: Data(secret.utf8),
            // AfterFirstUnlock, NOT WhenUnlocked: the App Intent fires from a Shortcuts
            // automation with the device locked, so WhenUnlocked would fail the sync
            // exactly when it is meant to run.
            kSecAttrAccessible as String: kSecAttrAccessibleAfterFirstUnlock,
        ]
        attributes[kSecAttrAccessGroup as String] = accessGroup
        let pinnedStatus = SecItemAdd(attributes as CFDictionary, nil)
        if pinnedStatus == errSecSuccess { return .pinned }
        guard pinnedStatus == errSecMissingEntitlement else {
            NSLog("[device-secret] keychain add failed (status \(pinnedStatus))")
            return nil
        }
        attributes.removeValue(forKey: kSecAttrAccessGroup as String)
        let fallbackStatus = SecItemAdd(attributes as CFDictionary, nil)
        if fallbackStatus == errSecSuccess { return .fallback }
        NSLog("[device-secret] keychain add failed in both domains (\(pinnedStatus) / \(fallbackStatus))")
        return nil
    }

    /// Is a secret stored for THIS identity? Presence + fingerprint only — never the
    /// value. Tries the pinned domain, then the default one: on an unsigned build the
    /// item lives in the default domain, and concluding "absent" from a pinned miss
    /// would re-mint on every launch.
    static func peek(userID: String) -> (present: Bool, fingerprint: String?, domain: Domain) {
        for domain in [Domain.pinned, Domain.fallback] {
            var query = baseQuery(domain)
            query[kSecAttrAccount as String] = userID
            query[kSecMatchLimit as String] = kSecMatchLimitOne
            query[kSecReturnData as String] = true
            var item: CFTypeRef?
            guard SecItemCopyMatching(query as CFDictionary, &item) == errSecSuccess,
                  let data = item as? Data,
                  let secret = String(data: data, encoding: .utf8)
            else { continue }
            return (true, fingerprint(secret), domain)
        }
        return (false, nil, .pinned)
    }

    /// The headless entry point (#15934): service-only, no user id needed, because the
    /// write path guarantees exactly one item. DELIBERATELY returns nil rather than
    /// picking one if more than one item exists — delete-all-then-add makes that
    /// impossible, so two items mean the write invariant is broken and must surface.
    static func readSecret() -> String? {
        for domain in [Domain.pinned, Domain.fallback] {
            var query = baseQuery(domain)
            query[kSecMatchLimit as String] = kSecMatchLimitAll
            query[kSecReturnData as String] = true
            var item: CFTypeRef?
            guard SecItemCopyMatching(query as CFDictionary, &item) == errSecSuccess,
                  let items = item as? [Data]
            else { continue }
            if items.count > 1 {
                NSLog("[device-secret] BROKEN INVARIANT: \(items.count) keychain items for one device; refusing to pick one")
                return nil
            }
            if let data = items.first, let secret = String(data: data, encoding: .utf8) {
                return secret
            }
        }
        return nil
    }
}

// The web view's handle on the store. Write-and-probe ONLY: there is deliberately no
// read-back method, because the plaintext's one appearance in JS is the mint response
// and a read-back would re-expose the credential every launch for no consumer.
@objc(DeviceSecretPlugin)
public class DeviceSecretPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "DeviceSecretPlugin"
    public let jsName = "DeviceSecret"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "getDeviceId", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "peek", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "store", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "clear", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "present", returnType: CAPPluginReturnPromise),
    ]

    // The route the credential is presented to when the web view asks whether the server
    // still takes it. Pinned HERE rather than taken from the call: a method that attaches
    // this credential to a caller-chosen URL would be an exfiltration seam, and nothing
    // needs one. That route carries no reading and judges the credential alone, so its 401
    // means "this secret is wrong" and never "the page store did not answer" — a 503 is
    // what says that, and the caller decides nothing on it.
    private static let admissionEndpoint = URL(
        string: "https://alanwalton.com/api/device-secret/admission")!

    // identifierForVendor — stable per vendor and RESET ON UNINSTALL, which is exactly
    // the revoke-on-uninstall behaviour the server side wants.
    @objc func getDeviceId(_ call: CAPPluginCall) {
        if let deviceId = UIDevice.current.identifierForVendor?.uuidString {
            call.resolve(["deviceId": deviceId])
        } else {
            call.resolve(["deviceId": NSNull()])
        }
    }

    @objc func peek(_ call: CAPPluginCall) {
        guard let userID = call.getString("userId"), !userID.isEmpty else {
            call.reject("userId is required")
            return
        }
        let result = DeviceSecretKeychain.peek(userID: userID)
        var payload: [String: Any] = [
            "present": result.present,
            "domain": result.domain.rawValue,
        ]
        if let fingerprint = result.fingerprint {
            payload["fingerprint"] = fingerprint
        } else {
            payload["fingerprint"] = NSNull()
        }
        call.resolve(payload)
    }

    // The reject message never carries the secret — a rejected store surfaces the
    // failure, and the caller discards the plaintext without attempting recovery.
    @objc func store(_ call: CAPPluginCall) {
        guard let secret = call.getString("secret"), !secret.isEmpty,
              let userID = call.getString("userId"), !userID.isEmpty else {
            call.reject("secret and userId are required")
            return
        }
        guard let domain = DeviceSecretKeychain.store(secret: secret, userID: userID) else {
            call.reject("keychain store failed")
            return
        }
        call.resolve(["domain": domain.rawValue])
    }

    @objc func clear(_ call: CAPPluginCall) {
        call.resolve(["cleared": DeviceSecretKeychain.clear()])
    }

    // Presents what this device holds and answers with the STATUS ALONE. This is not a
    // read-back and must never become one: the value is read, put in a header, and dropped.
    // The web view learns whether the server still takes this device and nothing else,
    // which is the whole of what it needs to decide between keeping and re-minting.
    //
    // `held: false` says the keychain answered with nothing — either empty or the two-item
    // broken invariant readSecret() refuses to choose between. Both are read by the caller
    // as a refusal, because nothing is what a route refuses. `status: 0` says the route was
    // never reached, and that decides nothing.
    @objc func present(_ call: CAPPluginCall) {
        guard let secret = DeviceSecretKeychain.readSecret() else {
            call.resolve(["held": false, "status": 0])
            return
        }
        Task {
            var request = URLRequest(url: DeviceSecretPlugin.admissionEndpoint)
            request.cachePolicy = .reloadIgnoringLocalCacheData
            request.timeoutInterval = 15
            request.setValue(secret, forHTTPHeaderField: "X-Device-Secret")
            guard let (_, response) = try? await URLSession.shared.data(for: request),
                  let http = response as? HTTPURLResponse
            else {
                call.resolve(["held": true, "status": 0])
                return
            }
            call.resolve(["held": true, "status": http.statusCode])
        }
    }
}
SWIFT_DEVICE_SECRET
} >> "$APPDELEGATE"
echo "OK: appended DeviceSecretKeychain + DeviceSecretPlugin to $APPDELEGATE"
else
echo "OK: device-secret keychain seam SKIPPED (NATIVE_SHELL_DEVICE_SECRET=0) — no Swift appended."
fi
