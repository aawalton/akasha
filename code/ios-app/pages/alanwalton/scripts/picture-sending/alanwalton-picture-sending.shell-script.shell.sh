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
    /// What a send came to: the sentence Alan reads, and whether the picture got there. The
    /// camera reads `ok` to decide whether to put itself away or hold the reason up.
    struct Sent {
        let ok: Bool
        let outcome: String
    }

    private static let endpoint = URL(string: "https://alanwalton.com/api/picture")!
    private static let noticeIdentifier = "picture.lastRun"

    /// BOTH TIMEOUTS ARE SET, because only the second bounds the whole send.
    /// `timeoutIntervalForRequest` restarts on every byte that moves, so a connection trickling
    /// bytes forever never trips it; `timeoutIntervalForResource` is the ceiling on the whole
    /// transfer and is what makes a press that cannot reach the network end in a sentence.
    /// `waitsForConnectivity` is false rather than left to the default, because a send held open
    /// waiting for a network to arrive is exactly the hang this replaces.
    private static let session: URLSession = {
        let configuration = URLSessionConfiguration.default
        configuration.timeoutIntervalForRequest = 15
        configuration.timeoutIntervalForResource = 30
        configuration.waitsForConnectivity = false
        return URLSession(configuration: configuration)
    }()

    /// Sends the jpeg and answers one sentence saying what happened, which the camera shows
    /// and a notice repeats so the outcome is readable after the camera is gone.
    static func send(_ jpeg: Data) async -> Sent {
        let sent = await sent(jpeg)
        notice(sent.outcome)
        return sent
    }

    private static func sent(_ jpeg: Data) async -> Sent {
        guard let secret = DeviceSecretKeychain.readSecret() else {
            return Sent(
                ok: false,
                outcome:
                    "Not sent: this phone holds no device credential. Open the app and sign in once, then take it again."
            )
        }
        var request = URLRequest(url: endpoint)
        request.httpMethod = "POST"
        request.timeoutInterval = 15
        request.setValue("image/jpeg", forHTTPHeaderField: "Content-Type")
        request.setValue(secret, forHTTPHeaderField: "X-Device-Secret")
        guard let (data, response) = try? await session.upload(for: request, from: jpeg),
            let http = response as? HTTPURLResponse
        else {
            return Sent(ok: false, outcome: "Not sent: alanwalton.com could not be reached.")
        }
        guard http.statusCode == 200 else {
            let detail = String(data: data, encoding: .utf8).map { $0.prefix(120) } ?? ""
            return Sent(ok: false, outcome: "Not sent (HTTP \(http.statusCode)). \(detail)")
        }
        return Sent(ok: true, outcome: "Sent to your handler.")
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
