#!/usr/bin/env bash
# Sourced by alanwalton-ios-seam, in the shell that runs it. It reads the names
# the seam set and is not a program of its own.
if [[ "$HANDOVER_SIGN_IN_ENABLED" == "1" ]]; then
{
cat <<'SWIFT_HANDOVER_HEAD'

// ===== handover sign-in seam ================================================
// Google refuses an OAuth screen shown in an embedded user agent, and this app IS
// one: alanwalton.com runs in a WKWebView. So the sign-in is not shown here at all.
// ASWebAuthenticationSession hands it to Safari's own process, which Google accepts,
// and takes the `alanwalton://` callback back IN-PROCESS — no Associated Domains
// entitlement, no AppDelegate URL plumbing, no other app able to claim the code.
//
// What comes back is a 30-second EdDSA code the web layer trades for the site's own
// cookie. The code alone is not enough: it carries the SHA-256 of a verifier this
// plugin minted and kept, and the exchange refuses a code whose verifier does not
// hash to it. That is what stops another app that registered the same URL scheme
// from spending a code it intercepted.
enum HandoverChallenge {
    // 32 bytes of the system CSPRNG, base64url. A failure here is FINAL — there is
    // no weaker source to fall back to, and falling back to one silently would leave
    // a guessable verifier holding up the whole binding.
    static func verifier() -> String? {
        var bytes = [UInt8](repeating: 0, count: 32)
        guard SecRandomCopyBytes(kSecRandomDefault, bytes.count, &bytes) == errSecSuccess else {
            return nil
        }
        return base64URL(Data(bytes))
    }

    // The site hashes the verifier's UTF-8 with SHA-256 and compares base64url with no
    // padding, so this spells it the same way: 32 digest bytes become 43 characters.
    static func challenge(for verifier: String) -> String {
        return base64URL(Data(SHA256.hash(data: Data(verifier.utf8))))
    }

    private static func base64URL(_ bytes: Data) -> String {
        return bytes.base64EncodedString()
            .replacingOccurrences(of: "+", with: "-")
            .replacingOccurrences(of: "/", with: "_")
            .replacingOccurrences(of: "=", with: "")
    }
}

// The web view's handle on the sign-in. One method, and it answers ONLY with a pair
// that is worth trading: a code and the verifier that code is bound to. A cancel, a
// callback with no code, and a session that would not open are all rejections — the
// web layer never has to tell a half-finished sign-in from a finished one.
@objc(HandoverSignInPlugin)
public class HandoverSignInPlugin: CAPPlugin, CAPBridgedPlugin,
    ASWebAuthenticationPresentationContextProviding {
    public let identifier = "HandoverSignInPlugin"
    public let jsName = "HandoverSignIn"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "start", returnType: CAPPluginReturnPromise)
    ]

    // Pinned HERE rather than taken from the call. A method that opened a caller-chosen
    // address in a session bearing the person's Safari cookies would be a phishing seam,
    // and the code that comes back is a bearer credential for this site alone.
    private static let mintingAt = "https://alanwalton.com/handover/app"
    private static let challengeParam = "challenge"
    private static let codeParam = "code"
    // Told apart from a real failure so the web layer can go quiet on a cancel instead of
    // accusing Google of refusing a sign-in the person themselves backed out of.
    private static let closedCode = "closed"

    // ASWebAuthenticationSession is deallocated — and so cancelled — the moment nothing
    // holds it, so the session outlives `start` only because this does.
    private var opened: ASWebAuthenticationSession?

    @objc func start(_ call: CAPPluginCall) {
SWIFT_HANDOVER_HEAD
cat <<SWIFT_HANDOVER_PINS
        let callbackScheme = "$URL_SCHEME"
SWIFT_HANDOVER_PINS
cat <<'SWIFT_HANDOVER'
        guard let verifier = HandoverChallenge.verifier() else {
            call.reject("no verifier could be minted")
            return
        }
        guard var parts = URLComponents(string: HandoverSignInPlugin.mintingAt) else {
            call.reject("the handover address would not parse")
            return
        }
        parts.queryItems = [
            URLQueryItem(
                name: HandoverSignInPlugin.challengeParam,
                value: HandoverChallenge.challenge(for: verifier)
            )
        ]
        guard let asking = parts.url else {
            call.reject("the handover address would not parse")
            return
        }
        DispatchQueue.main.async { [weak self] in
            guard let self = self else {
                call.reject("the sign-in would not open")
                return
            }
            let session = ASWebAuthenticationSession(
                url: asking,
                callbackURLScheme: callbackScheme
            ) { [weak self] landed, failed in
                self?.opened = nil
                if let failed = failed {
                    let why = failed as NSError
                    if why.domain == ASWebAuthenticationSessionError.errorDomain,
                       why.code == ASWebAuthenticationSessionError.canceledLogin.rawValue {
                        call.reject("the sign-in was closed", HandoverSignInPlugin.closedCode)
                        return
                    }
                    call.reject("the sign-in did not finish: \(failed.localizedDescription)")
                    return
                }
                guard let landed = landed,
                      let carried = URLComponents(url: landed, resolvingAgainstBaseURL: false),
                      let code = carried.queryItems?.first(where: {
                          $0.name == HandoverSignInPlugin.codeParam
                      })?.value,
                      !code.isEmpty
                else {
                    call.reject("the handover carried no code")
                    return
                }
                call.resolve(["code": code, "verifier": verifier])
            }
            session.presentationContextProvider = self
            // false, NOT true: an ephemeral session throws away the Safari cookies this
            // person is already signed in to Google with, turning a one-tap sign-in into
            // typing a password on a phone keyboard every single time.
            session.prefersEphemeralWebBrowserSession = false
            self.opened = session
            if !session.start() {
                self.opened = nil
                call.reject("the sign-in would not open")
            }
        }
    }

    // The window the sheet is presented over. The bridge's own view controller is the
    // right answer in this app; the scene walk is there so a window change upstream
    // degrades to the key window rather than to a crash on a force-unwrap.
    public func presentationAnchor(for session: ASWebAuthenticationSession) -> ASPresentationAnchor {
        if let window = self.bridge?.viewController?.view.window {
            return window
        }
        let windows = UIApplication.shared.connectedScenes
            .compactMap { $0 as? UIWindowScene }
            .flatMap { $0.windows }
        return windows.first(where: { $0.isKeyWindow }) ?? windows.first ?? UIWindow()
    }
}
SWIFT_HANDOVER
} >> "$APPDELEGATE"
echo "OK: appended HandoverChallenge + HandoverSignInPlugin to $APPDELEGATE"
else
echo "OK: handover sign-in seam SKIPPED (NATIVE_SHELL_HANDOVER_SIGN_IN=0) — no Swift appended."
fi
