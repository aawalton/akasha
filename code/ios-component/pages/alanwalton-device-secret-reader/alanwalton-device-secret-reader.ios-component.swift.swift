import Foundation
import Security

let DEVICE_SECRET_HEADER = "X-Device-Secret"

enum DeviceSecretReader {
    private static let service = DeviceSecretPins.service

    private static let accessGroup = DeviceSecretPins.accessGroup

    private static func heldQuery() -> [String: Any] {
        [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: service,
            kSecAttrAccessGroup as String: accessGroup,
            kSecMatchLimit as String: kSecMatchLimitAll,
            kSecReturnData as String: true,
        ]
    }

    static func read() -> String? {
        var item: CFTypeRef?
        guard SecItemCopyMatching(heldQuery() as CFDictionary, &item) == errSecSuccess,
            let items = item as? [Data]
        else { return nil }
        if items.count > 1 {
            NSLog("[device-secret] \(items.count) keychain items for one device; refusing to pick one")
            return nil
        }
        guard let data = items.first else { return nil }
        return String(data: data, encoding: .utf8)
    }

    static func diagnosis() -> String {
        var item: CFTypeRef?
        let status = SecItemCopyMatching(heldQuery() as CFDictionary, &item)
        if status == errSecItemNotFound { return "no key" }
        if status != errSecSuccess { return "key err \(status)" }
        let count = (item as? [Data])?.count ?? 0
        if count == 0 { return "no key" }
        if count > 1 { return "\(count) keys" }
        return "key ok"
    }
}
