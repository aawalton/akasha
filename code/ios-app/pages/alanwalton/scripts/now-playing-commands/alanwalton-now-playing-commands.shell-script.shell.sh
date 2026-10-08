#!/usr/bin/env bash
# Sourced by alanwalton-ios-seam, in the shell that runs it. It reads the names
# the seam set and is not a program of its own.
cat >> "$APPDELEGATE" <<'SWIFT_NOW_PLAYING'

// ===== now-playing commands seam =============================================
// The lock screen's play, pause and play/pause, taken by the app process itself.
// Once narration pauses, iOS suspends the app, and the remote commands WebKit
// registers for the page never reach it while the phone stays locked. A target
// added to MPRemoteCommandCenter here makes iOS wake the app for the command, and
// the command is forwarded to the page as a "command" event, which plays or pauses
// the narration's audio element.
//
// claim() adds the three targets and keeps the audio session in .playback;
// release() removes them. Each forward runs inside a short background task so the
// page has time to act before the app is suspended again.
//
// Surfaces on the JS bridge as window.Capacitor.Plugins.NowPlayingCommands, and
// is registered by its @objc class name in packageClassList.
@objc(NowPlayingCommandsPlugin)
public class NowPlayingCommandsPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "NowPlayingCommandsPlugin"
    public let jsName = "NowPlayingCommands"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "claim", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "release", returnType: CAPPluginReturnPromise)
    ]

    private var targets: [(MPRemoteCommand, Any)] = []
    private var forwarding: UIBackgroundTaskIdentifier = .invalid

    @objc func claim(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            self.removeTargets()
            do {
                let session = AVAudioSession.sharedInstance()
                try session.setCategory(.playback)
                try session.setActive(true)
            } catch {
                NSLog("[NowPlayingCommands] session activation FAILED: \(error.localizedDescription)")
            }
            UIApplication.shared.beginReceivingRemoteControlEvents()
            let center = MPRemoteCommandCenter.shared()
            let commands: [(MPRemoteCommand, String)] = [
                (center.playCommand, "play"),
                (center.pauseCommand, "pause"),
                (center.togglePlayPauseCommand, "toggle")
            ]
            for (command, said) in commands {
                command.isEnabled = true
                let target = command.addTarget { [weak self] _ in
                    self?.forward(said)
                    return .success
                }
                self.targets.append((command, target))
            }
            NSLog("[NowPlayingCommands] claimed play, pause and toggle")
            call.resolve()
        }
    }

    @objc func release(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            self.removeTargets()
            NSLog("[NowPlayingCommands] released")
            call.resolve()
        }
    }

    private func removeTargets() {
        for (command, target) in targets {
            command.removeTarget(target)
        }
        targets = []
    }

    private func forward(_ said: String) {
        endForwarding()
        forwarding = UIApplication.shared.beginBackgroundTask(withName: "now-playing-command") {
            self.endForwarding()
        }
        NSLog("[NowPlayingCommands] forwarding \(said)")
        notifyListeners("command", data: ["command": said])
        let task = forwarding
        DispatchQueue.main.asyncAfter(deadline: .now() + 10) {
            if self.forwarding == task { self.endForwarding() }
        }
    }

    private func endForwarding() {
        guard forwarding != .invalid else { return }
        UIApplication.shared.endBackgroundTask(forwarding)
        forwarding = .invalid
    }
}
SWIFT_NOW_PLAYING
echo "OK: appended NowPlayingCommandsPlugin to $APPDELEGATE"
