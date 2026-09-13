#!/usr/bin/env bash
# Sourced by alanwalton-ios-seam, in the shell that runs it. It reads the names the seam
# set and is not a program of its own.

if [[ "$PICTURE_INTENT_ENABLED" == "1" ]]; then
cat >> "$APPDELEGATE" <<'SWIFT_PICTURE_SENDING'

// ----- the picture sent to alanwalton.com, and the outcome told on the phone -----
// The body is the jpeg alone, and the only header naming this phone is the device secret the
// sign-in stored in the Keychain. The server knows whose picture it is from that secret, so
// nothing about Alan rides along with the bytes.
enum PictureSending {
    private static let endpoint = URL(string: "https://alanwalton.com/api/picture")!
    private static let noticeIdentifier = "picture.lastRun"

    /// Sends the jpeg and answers one sentence saying what happened, which the camera shows
    /// and a notice repeats so the outcome is readable after the camera is gone.
    static func send(_ jpeg: Data) async -> String {
        let outcome = await sent(jpeg)
        notice(outcome)
        return outcome
    }

    private static func sent(_ jpeg: Data) async -> String {
        guard let secret = DeviceSecretKeychain.readSecret() else {
            return "Picture not sent: this phone holds no device credential. Open the app and sign in once, then take it again."
        }
        var request = URLRequest(url: endpoint)
        request.httpMethod = "POST"
        request.timeoutInterval = 60
        request.setValue("image/jpeg", forHTTPHeaderField: "Content-Type")
        request.setValue(secret, forHTTPHeaderField: "X-Device-Secret")
        guard let (data, response) = try? await URLSession.shared.upload(for: request, from: jpeg),
            let http = response as? HTTPURLResponse
        else {
            return "Picture not sent: alanwalton.com could not be reached."
        }
        guard http.statusCode == 200 else {
            let detail = String(data: data, encoding: .utf8).map { $0.prefix(120) } ?? ""
            return "Picture not sent (HTTP \(http.statusCode)). \(detail)"
        }
        return "Picture sent to your handler."
    }

    static func notice(_ text: String) {
        NSLog("[picture] \(text)")
        let content = UNMutableNotificationContent()
        content.title = "Picture"
        content.body = text
        UNUserNotificationCenter.current().add(
            UNNotificationRequest(identifier: noticeIdentifier, content: content, trigger: nil)
        ) { error in
            if let error {
                NSLog("[picture] the notice could not be posted: \(error.localizedDescription)")
            }
        }
    }
}
SWIFT_PICTURE_SENDING
echo "OK: appended PictureSending to $APPDELEGATE"
else
echo "OK: picture-sending seam SKIPPED — NATIVE_SHELL_PICTURE_INTENT=0 (no Swift appended)."
fi
