#!/usr/bin/env bash
# Sourced by smilingjenny-ios-seam inside its widget guard, in the shell that runs
# it. Not a program of its own: it reads PROJECT_PBXPROJ, WIDGET_NAME,
# WIDGET_BUNDLE_ID, WIDGET_TEAM, WIDGET_DEPLOYMENT_TARGET, WIDGET_PROFILE_NAME and
# APP_PROFILE_NAME from the seam, and stands apart from it only because one page
# holds one concern.
WIDGET_SEAM_RB=$(mktemp)
cat > "$WIDGET_SEAM_RB" <<'RUBY'
require "xcodeproj"

project_path = ENV.fetch("PROJECT_PBXPROJ")
widget_name  = ENV.fetch("WIDGET_NAME")
bundle_id    = ENV.fetch("WIDGET_BUNDLE_ID")
team         = ENV.fetch("WIDGET_TEAM")
deploy_tgt   = ENV.fetch("WIDGET_DEPLOYMENT_TARGET")
profile_name = ENV.fetch("WIDGET_PROFILE_NAME")
app_profile  = ENV.fetch("APP_PROFILE_NAME")
dest_rel     = widget_name # group path relative to ios/App (the project dir)

project = Xcodeproj::Project.open(project_path)
app = project.targets.find { |t| t.name == "App" }
abort("App target not found in #{project_path}") unless app

# PIN THE APP TARGET TO MANUAL DISTRIBUTION SIGNING, against its own ensured App
# Store profile, whenever the widget is embedded. An embedded .appex and its
# parent app must sign with the SAME certificate; left on automatic, the App
# resolves an Apple Development cert during the archive while the widget signs
# Apple Distribution, and the archive fails with "Embedded binary is not signed
# with the same certificate as the parent app". So this pin belongs to the widget
# seam rather than being a separate opinion about how the app signs.
app.build_configurations.each do |config|
  bs = config.build_settings
  bs["CODE_SIGN_STYLE"] = "Manual"
  bs["PROVISIONING_PROFILE_SPECIFIER"] = app_profile
  bs["CODE_SIGN_IDENTITY"] = "Apple Distribution"
  bs["DEVELOPMENT_TEAM"] = team
end

# Find-or-create the app-extension target (keyed on name → idempotent).
widget = project.targets.find { |t| t.name == widget_name }
widget ||= project.new_target(:app_extension, widget_name, :ios, deploy_tgt)

# CURRENT_PROJECT_VERSION is left to the project-wide value the archive passes
# (CURRENT_PROJECT_VERSION=$BUILD_NUMBER), so the widget's CFBundleVersion always
# matches the app's build number.
app_mv = app.build_configurations.first.build_settings["MARKETING_VERSION"] || "1.0"
widget.build_configurations.each do |config|
  bs = config.build_settings
  bs["PRODUCT_BUNDLE_IDENTIFIER"] = bundle_id
  bs["PRODUCT_NAME"] = "$(TARGET_NAME)"
  bs["INFOPLIST_FILE"] = "#{dest_rel}/Info.plist"
  bs["GENERATE_INFOPLIST_FILE"] = "NO"
  bs["DEVELOPMENT_TEAM"] = team
  # Manual, pinned by name to the profile signing.ts ensures and installs before
  # the archive. Automatic here would demand a nonexistent development profile
  # for the widget bundle id and time out trying to create one over ssh.
  bs["CODE_SIGN_STYLE"] = "Manual"
  bs["PROVISIONING_PROFILE_SPECIFIER"] = profile_name
  bs["CODE_SIGN_IDENTITY"] = "Apple Distribution"
  bs["SWIFT_VERSION"] = "5.0"
  bs["SKIP_INSTALL"] = "YES"
  bs["MARKETING_VERSION"] = app_mv
  bs["IPHONEOS_DEPLOYMENT_TARGET"] = deploy_tgt
  bs["TARGETED_DEVICE_FAMILY"] = "1,2"
  bs["LD_RUNPATH_SEARCH_PATHS"] = ["$(inherited)", "@executable_path/Frameworks", "@executable_path/../../Frameworks"]
  bs["SWIFT_EMIT_LOC_STRINGS"] = "YES"
end

# (Re)build the widget's file group and compile sources from disk — cleared first
# so a re-run never duplicates references. SwiftUI and WidgetKit auto-link on
# import, so nothing needs explicit framework linking.
group = project.main_group.find_subpath(dest_rel, true)
group.set_source_tree("<group>")
group.set_path(dest_rel)
group.children.to_a.each(&:remove_from_project)
widget.source_build_phase.files.to_a.each(&:remove_from_project)
Dir.glob(File.join(File.dirname(project_path), dest_rel, "*.swift")).sort.each do |swift|
  ref = group.new_reference(File.basename(swift))
  widget.source_build_phase.add_file_reference(ref)
end
group.new_reference("Info.plist") # visible in Xcode; not compiled

# The App depends on the widget and embeds it in an "Embed App Extensions"
# copy-files phase (PlugIns). Both guarded → idempotent.
app.add_dependency(widget) unless app.dependencies.any? { |d| d.target == widget }
embed = app.copy_files_build_phases.find { |p| p.symbol_dst_subfolder_spec == :plug_ins }
embed ||= app.new_copy_files_build_phase("Embed App Extensions")
embed.symbol_dst_subfolder_spec = :plug_ins
unless embed.files.any? { |bf| bf.file_ref == widget.product_reference }
  bf = embed.add_file_reference(widget.product_reference)
  bf.settings = { "ATTRIBUTES" => ["RemoveHeadersOnCopy"] }
end

project.save
puts "OK: ensured #{widget_name} target (bundle #{bundle_id}) in #{project_path}"
RUBY
PROJECT_PBXPROJ="$PROJECT_PBXPROJ" WIDGET_NAME="$WIDGET_NAME" WIDGET_BUNDLE_ID="$WIDGET_BUNDLE_ID" \
  WIDGET_TEAM="$WIDGET_TEAM" WIDGET_DEPLOYMENT_TARGET="$WIDGET_DEPLOYMENT_TARGET" \
  WIDGET_PROFILE_NAME="$WIDGET_PROFILE_NAME" APP_PROFILE_NAME="$APP_PROFILE_NAME" \
  ruby "$WIDGET_SEAM_RB"
rm -f "$WIDGET_SEAM_RB"
