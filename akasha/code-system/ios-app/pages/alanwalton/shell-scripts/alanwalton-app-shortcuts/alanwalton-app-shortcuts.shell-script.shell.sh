#!/usr/bin/env bash
# Sourced by alanwalton-ios-seam, in the shell that runs it, and cut from
# 08-shortcuts-and-keychain.sh when that seam moved into akasha. It reads the names
# the seam set and is not a program of its own.
if [[ "$WALLPAPER_INTENT_ENABLED" == "1" || "$HEALTH_SAMPLES_INTENT_ENABLED" == "1" ]]; then
{
cat <<'SWIFT_PROVIDER_HEAD'

// ===== app shortcuts provider seam ==========================================
// Auto-registers each enabled App Intent as a first-class App Shortcut so it appears in the
// Shortcuts app and Spotlight with no user setup. Exactly ONE AppShortcutsProvider may exist per
// app; this is the app's only one. Each phrase must interpolate \(.applicationName).
@available(iOS 16.0, *)
struct AlanWaltonAppShortcuts: AppShortcutsProvider {
    static var appShortcuts: [AppShortcut] {
SWIFT_PROVIDER_HEAD
if [[ "$WALLPAPER_INTENT_ENABLED" == "1" ]]; then
cat <<'SWIFT_PROVIDER_WALLPAPER'
        AppShortcut(
            intent: GetWallpaperIntent(),
            phrases: ["Get \(.applicationName) wallpaper"],
            shortTitle: "Get Wallpaper",
            systemImageName: "photo"
        )
SWIFT_PROVIDER_WALLPAPER
fi
if [[ "$HEALTH_SAMPLES_INTENT_ENABLED" == "1" ]]; then
cat <<'SWIFT_PROVIDER_HEALTH_SAMPLES'
        AppShortcut(
            intent: StreamHealthSamplesIntent(),
            phrases: ["Stream \(.applicationName) health samples"],
            shortTitle: "Stream Health Samples",
            systemImageName: "waveform.path.ecg"
        )
SWIFT_PROVIDER_HEALTH_SAMPLES
fi
cat <<'SWIFT_PROVIDER_TAIL'
    }
}
SWIFT_PROVIDER_TAIL
} >> "$APPDELEGATE"
echo "OK: appended AlanWaltonAppShortcuts provider (single, shared) to $APPDELEGATE"
else
echo "OK: app shortcuts provider seam SKIPPED — no App Intent enabled (no Swift appended)."
fi
