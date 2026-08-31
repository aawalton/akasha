#!/usr/bin/env bash
# Sourced by alanwalton-ios-seam, in the shell that runs it, and cut from
# 02-webview-and-audio.sh when that seam moved into akasha. It reads the names
# the seam set and is not a program of its own.
cat >> "$APPDELEGATE" <<'SWIFT'

// ===== offline-audio native playback shim =====================================
// A Capacitor plugin that plays the DOWNLOADED LOCAL file via AVPlayer over an
// AVAudioSession in the .playback category. This is what the harness's "Play
// local file" button calls instead of the web <audio> element, which fails on
// the local file ("operation not supported"). AVPlayer reads the file:// URL
// directly and, with UIBackgroundModes=[audio], keeps playing screen-off.
//
// Surfaces on the JS bridge as window.Capacitor.Plugins.NativeAudio (the same
// path as the other native plugins). It is registered by adding the @objc class
// name to packageClassList in capacitor.config.json (done by this seam below).
@objc(NativeAudioPlugin)
public class NativeAudioPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "NativeAudioPlugin"
    public let jsName = "NativeAudio"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "play", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "pause", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "stop", returnType: CAPPluginReturnPromise)
    ]

    // Retained as properties so neither the player nor its item is deallocated
    // mid-playback (a GC'd local AVPlayer goes silent within milliseconds).
    private var player: AVPlayer?
    private var currentItem: AVPlayerItem?

    @objc func play(_ call: CAPPluginCall) {
        guard let uriString = call.getString("uri") else {
            call.reject("play() requires a 'uri' (file:// URL of the downloaded file)")
            return
        }
        // Build a CANONICAL file URL. For a LOCAL file use URL(fileURLWithPath:),
        // NOT URL(string: "file://…") — the string initializer silently yields a
        // player that produces no sound (and no error) when the path isn't fully
        // percent-encoded. Strip the file:// prefix and percent-decode to the raw
        // filesystem path that fileURLWithPath expects. (Iteration-1 used
        // URL(string:) and was audibly silent despite playing:true.)
        let raw = uriString.hasPrefix("file://")
            ? String(uriString.dropFirst("file://".count))
            : uriString
        let path = raw.removingPercentEncoding ?? raw
        let url = URL(fileURLWithPath: path)

        // Do the ENTIRE audio-session setup + player creation + play on the main
        // queue in strict order, so there is no cross-thread window between
        // activating the session and starting playback.
        DispatchQueue.main.async {
            let session = AVAudioSession.sharedInstance()
            do {
                try session.setCategory(.playback, mode: .default, options: [])
                try session.setActive(true, options: [])
                NSLog("[NativeAudio] session ACTIVE category=\(session.category.rawValue) outputVolume=\(session.outputVolume) route=\(session.currentRoute.outputs.map { $0.portType.rawValue })")
            } catch {
                NSLog("[NativeAudio] session activation FAILED: \(error.localizedDescription)")
                call.reject("AVAudioSession activation failed: \(error.localizedDescription)")
                return
            }

            let item = AVPlayerItem(url: url)
            self.currentItem = item
            if let player = self.player {
                player.replaceCurrentItem(with: item)
            } else {
                self.player = AVPlayer(playerItem: item)
            }
            // For a local file, do not let the player wait to "minimize stalling"
            // — start immediately — and make volume/mute explicit.
            self.player?.automaticallyWaitsToMinimizeStalling = false
            self.player?.volume = 1.0
            self.player?.isMuted = false

            let size = (try? FileManager.default.attributesOfItem(atPath: url.path))?[.size] as? Int ?? -1
            NSLog("[NativeAudio] play url=\(url.absoluteString) exists=\(FileManager.default.fileExists(atPath: url.path)) bytes=\(size)")
            self.player?.play()
            NSLog("[NativeAudio] post-play rate=\(self.player?.rate ?? -1)")

            // Diagnostic re-check: a silent failure shows here as status=2
            // (.failed, with itemErr set) or rate stuck at 0 — captured in the
            // Xcode console for the next iteration if audio is still absent.
            DispatchQueue.main.asyncAfter(deadline: .now() + 1.0) {
                let st = self.player?.currentItem?.status.rawValue ?? -99
                NSLog("[NativeAudio] +1s status=\(st) rate=\(self.player?.rate ?? -1) playerErr=\(String(describing: self.player?.error)) itemErr=\(String(describing: self.player?.currentItem?.error))")
            }

            call.resolve(["playing": true, "uri": uriString])
        }
    }

    @objc func pause(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            self.player?.pause()
            call.resolve()
        }
    }

    @objc func stop(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            self.player?.pause()
            self.player?.replaceCurrentItem(with: nil)
            self.currentItem = nil
            call.resolve()
        }
    }
}
SWIFT
echo "OK: appended NativeAudioPlugin shim to $APPDELEGATE"
