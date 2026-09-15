#!/usr/bin/env bash
# Sourced by alanwalton-ios-seam, in the shell that runs it. Reads ENTITLEMENTS_SRC,
# APS_ENABLED, HEALTHKIT_ENABLED, PROJECT_PBXPROJ and PB from the seam. The
# entitlements are composed from the copy standing beside the app program page,
# never authored here.
ENTITLEMENTS_DEST="ios/App/App/App.entitlements"
APS_SEAM_RB=$(mktemp)
cat > "$APS_SEAM_RB" <<'RUBY'
require "xcodeproj"

project_path     = ENV.fetch("PROJECT_PBXPROJ")
entitlements_rel = "App/App.entitlements" # relative to ios/App (the project dir)

project = Xcodeproj::Project.open(project_path)
app = project.targets.find { |t| t.name == "App" }
abort("App target not found in #{project_path}") unless app

# Clear any prior reference first so a re-run never duplicates it. The App group maps
# to ios/App/App where the .entitlements is copied.
group = project.main_group.find_subpath("App", true)
group.files.select { |f| f.path == "App.entitlements" }.each(&:remove_from_project)

app.build_configurations.each { |c| c.build_settings["CODE_SIGN_ENTITLEMENTS"] = entitlements_rel }
group.new_reference("App.entitlements") # visible in Xcode; not compiled
puts "OK: set CODE_SIGN_ENTITLEMENTS=#{entitlements_rel} on the App target in #{project_path}"

project.save
RUBY

if [[ ! -f "$ENTITLEMENTS_SRC" ]]; then
  echo "ERROR: $ENTITLEMENTS_SRC not found — the committed App entitlements are missing." >&2
  exit 1
fi
if [[ ! -d "$PROJECT_PBXPROJ" ]]; then
  echo "ERROR: $PROJECT_PBXPROJ not found — run 'npx cap add ios' first." >&2
  exit 1
fi
if ! gem list -i xcodeproj >/dev/null 2>&1; then
  echo "OK: installing the xcodeproj gem (user-install) for the entitlement seam…"
  gem install --user-install xcodeproj
fi

cp "$ENTITLEMENTS_SRC" "$ENTITLEMENTS_DEST"
if [[ "$APS_ENABLED" != "1" ]]; then
  "$PB" -c "Delete :aps-environment" "$ENTITLEMENTS_DEST" 2>/dev/null || true
  echo "OK: aps-environment entitlement SKIPPED — NATIVE_SHELL_APS=0 (key removed)."
fi
if [[ "$HEALTHKIT_ENABLED" != "1" ]]; then
  "$PB" -c "Delete :com.apple.developer.healthkit" "$ENTITLEMENTS_DEST" 2>/dev/null || true
  echo "OK: HealthKit entitlement SKIPPED — NATIVE_SHELL_HEALTHKIT=0 (key removed)."
fi
echo "OK: composed App entitlements into $ENTITLEMENTS_DEST"
PROJECT_PBXPROJ="$PROJECT_PBXPROJ" ruby "$APS_SEAM_RB"
rm -f "$APS_SEAM_RB"
