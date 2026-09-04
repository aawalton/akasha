import Foundation
import Security

let DEVICE_SECRET_HEADER = "X-Device-Secret"

enum DeviceSecretReader {
    private static let service = DeviceSecretPins.service

    private static let accessGroup = DeviceSecretPins.accessGroup

    static func read() -> String? {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: service,
            kSecAttrAccessGroup as String: accessGroup,
            kSecMatchLimit as String: kSecMatchLimitAll,
            kSecReturnData as String: true,
        ]
        var item: CFTypeRef?
        guard SecItemCopyMatching(query as CFDictionary, &item) == errSecSuccess,
            let items = item as? [Data]
        else { return nil }
        if items.count > 1 {
            NSLog("[device-secret] \(items.count) keychain items for one device; refusing to pick one")
            return nil
        }
        guard let data = items.first else { return nil }
        return String(data: data, encoding: .utf8)
    }
}
