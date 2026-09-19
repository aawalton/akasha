#!/usr/bin/env bash
# Sourced by alanwalton-ios-seam, in the shell that runs it. It reads the names the seam
# set and is not a program of its own.
#
# The app target and the widget extension compile the SAME file for what the activity
# carries. The extension is given it by the widget seam, which copies every component its
# program names; the app target is given it here. Restating those types in the AppDelegate
# would leave two declarations to drift apart, and an activity whose two sides disagree
# starts and never draws.
if [[ "$STOPLIGHTS_ACTIVITY_ENABLED" != "1" ]]; then
  echo "OK: stoplights live activity seam SKIPPED — NATIVE_SHELL_STOPLIGHTS_ACTIVITY=0."
else

if [[ ! -f "$STOPLIGHTS_CONTENT_SWIFT" ]]; then
  echo "ERROR: $STOPLIGHTS_CONTENT_SWIFT not found — the app would have nothing to start the activity with, and the plugin appended below would not compile." >&2
  exit 1
fi
if ! gem list -i xcodeproj >/dev/null 2>&1; then
  echo "OK: installing the xcodeproj gem (user-install) for the live activity seam…"
  gem install --user-install xcodeproj
fi

STOPLIGHTS_CONTENT_DEST="ios/App/App/StoplightsActivityContent.swift"
cp "$STOPLIGHTS_CONTENT_SWIFT" "$STOPLIGHTS_CONTENT_DEST"
echo "OK: copied the activity's carried types into $STOPLIGHTS_CONTENT_DEST"

STOPLIGHTS_SEAM_RB=$(mktemp)
cat > "$STOPLIGHTS_SEAM_RB" <<'RUBY'
require "xcodeproj"

project_path = ENV.fetch("PROJECT_PBXPROJ")
named = "StoplightsActivityContent.swift"

project = Xcodeproj::Project.open(project_path)
app = project.targets.find { |t| t.name == "App" }
abort("App target not found in #{project_path}") unless app

# Clear any prior reference first so a re-run never compiles the file twice. The App
# group maps to ios/App/App, where the file was just copied.
app.source_build_phase.files.to_a.each do |bf|
  ref = bf.file_ref
  bf.remove_from_project if !ref.nil? && ref.path == named
end
group = project.main_group.find_subpath("App", true)
group.files.select { |f| f.path == named }.each(&:remove_from_project)

ref = group.new_reference(named)
app.source_build_phase.add_file_reference(ref)
project.save
puts "OK: the App target compiles #{named} in #{project_path}"
RUBY
PROJECT_PBXPROJ="$PROJECT_PBXPROJ" ruby "$STOPLIGHTS_SEAM_RB"
rm -f "$STOPLIGHTS_SEAM_RB"

cat >> "$APPDELEGATE" <<'SWIFT_STOPLIGHTS_ACTIVITY'

// ===== stoplights live activity seam =========================================
// Starts, updates and ends the one live activity holding all thirteen stoplights. A
// CAPPlugin the web app calls: `start` with a reading, `update` with a later one, `end`
// to take it off the lock screen. What it carries is declared in
// StoplightsActivityContent.swift, which the widget extension compiles as well.
//
// THE CONTENT ARRIVES AS A JSON STRING RATHER THAN AS AN OBJECT.
//
// A bridged object reaches Swift as JSValue, which JSONSerialization does not always
// accept, and a decode that fails at the bridge reads exactly like a reading the server
// never sent. The caller spells it once with JSON.stringify and this decodes that.
//
// ONE ACTIVITY AT A TIME. Starting where one already runs updates the one running, because
// two would sit on the lock screen at once, each claiming to be the whole answer.
//
// THE ACTIVITY IS ASKED FOR A PUSH TOKEN, AND EVERY TOKEN IT NAMES IS HANDED UP.
//
// An activity never draws itself again on its own, so a lock screen left alone goes stale
// until the app is opened. Apple addresses a push to the activity rather than to the device,
// and hands that address over as a token which rotates. `pushTokenUpdates` names the one in
// force now and every later one, so the web layer posts each as that one arrives.
@objc(StoplightsActivityPlugin)
public class StoplightsActivityPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "StoplightsActivityPlugin"
    public let jsName = "StoplightsActivity"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "start", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "update", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "end", returnType: CAPPluginReturnPromise),
    ]

    private func contentIn(_ call: CAPPluginCall) -> StoplightsAttributes.ContentState? {
        guard let said = call.getString("content") else { return nil }
        return try? JSONDecoder().decode(
            StoplightsAttributes.ContentState.self, from: Data(said.utf8))
    }

    private var running: Activity<StoplightsAttributes>? {
        Activity<StoplightsAttributes>.activities.first
    }

    private var carrying: Set<String> = []

    override public func load() {
        for one in Activity<StoplightsAttributes>.activities { carry(one) }
    }

    private func carry(_ activity: Activity<StoplightsAttributes>) {
        if carrying.contains(activity.id) { return }
        carrying.insert(activity.id)
        Task { [weak self] in
            for await token in activity.pushTokenUpdates {
                let hex = token.map { String(format: "%02x", $0) }.joined()
                // THE TOKEN IS HELD UNTIL SOMETHING TAKES IT.
                //
                // This plugin loads with the bridge, and an activity already running names its
                // token at once — long before the web layer has loaded and asked to hear it. An
                // event sent to nobody is dropped, so the address the pushes go to would be lost
                // on every launch but the one that started the activity.
                self?.notifyListeners("token", data: ["value": hex], retainUntilConsumed: true)
            }
        }
    }

    @objc func start(_ call: CAPPluginCall) {
        guard ActivityAuthorizationInfo().areActivitiesEnabled else {
            call.reject("live activities are turned off for this app in Settings")
            return
        }
        guard let content = contentIn(call) else {
            call.reject("the call carried no content this activity could read")
            return
        }
        if let already = running {
            carry(already)
            Task {
                await already.update(ActivityContent(state: content, staleDate: nil))
                call.resolve(["id": already.id])
            }
            return
        }
        do {
            let started = try Activity.request(
                attributes: StoplightsAttributes(),
                content: ActivityContent(state: content, staleDate: nil),
                pushType: .token
            )
            carry(started)
            call.resolve(["id": started.id])
        } catch ActivityAuthorizationError.visibility {
            // A LAUNCH THAT IS NOT FOREGROUND YET IS ANSWERED WITH NO ACTIVITY RATHER THAN A FAULT.
            //
            // iOS refuses an activity asked for by a process it does not hold foreground, and a
            // cold launch asks before it is held. The app comes forward a moment later and asks
            // again, so the one refusal on the way in says nothing anyone need act on.
            call.resolve([:])
        } catch {
            call.reject("the activity would not start: \(error.localizedDescription)")
        }
    }

    @objc func update(_ call: CAPPluginCall) {
        guard let content = contentIn(call) else {
            call.reject("the call carried no content this activity could read")
            return
        }
        guard let already = running else {
            call.reject("no stoplights activity is running to update")
            return
        }
        Task {
            await already.update(ActivityContent(state: content, staleDate: nil))
            call.resolve()
        }
    }

    @objc func end(_ call: CAPPluginCall) {
        Task {
            for one in Activity<StoplightsAttributes>.activities {
                await one.end(nil, dismissalPolicy: .immediate)
            }
            call.resolve()
        }
    }
}
SWIFT_STOPLIGHTS_ACTIVITY
echo "OK: appended StoplightsActivityPlugin to $APPDELEGATE"
fi
