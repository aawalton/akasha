#!/usr/bin/env bash
# Sourced by alanwalton-ios-seam, in the shell that runs it. It reads the names the seam
# set and is not a program of its own. The camera and the sending this intent reaches are
# appended by the picture-capture and picture-sending seams the same shell sources.

if [[ "$PICTURE_INTENT_ENABLED" == "1" ]]; then
cat >> "$APPDELEGATE" <<'SWIFT_PICTURE_INTENT'

// ===== take-picture app intent seam ==========================================
// The action Alan's Action Button runs. iOS opens no camera for an app in the background, so
// this intent opens the app: the first press shows the camera, the second press takes the
// picture and sends it. Which press is which is read off whether the camera is on screen and
// ready, never off a flag an earlier press left behind.
@available(iOS 16.0, *)
struct TakePictureIntent: AppIntent {
    static var title: LocalizedStringResource = "Take Picture"
    static var description = IntentDescription(
        "Opens the camera on one run and takes the picture on the next, then sends the picture to alanwalton.com for Alan's handler."
    )
    static var openAppWhenRun: Bool = true

    @MainActor
    func perform() async throws -> some IntentResult {
        await PictureCapture.shared.pressed()
        return .result()
    }
}
SWIFT_PICTURE_INTENT
echo "OK: appended TakePictureIntent to $APPDELEGATE"
else
echo "OK: take-picture app intent seam SKIPPED — NATIVE_SHELL_PICTURE_INTENT=0 (no Swift appended)."
fi
