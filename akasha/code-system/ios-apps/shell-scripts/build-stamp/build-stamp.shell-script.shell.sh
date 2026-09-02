#!/usr/bin/env bash

NATIVE_SHELL_APP_STAMP_MARKER="NATIVE_SHELL_APP_COMMIT"
NATIVE_SHELL_WIDGET_STAMP_MARKER="NATIVE_SHELL_WIDGET_COMMIT"
NATIVE_SHELL_BUILD_STAMP_MARKER='// ===== build stamp seam'

native_shell_seam_commit() {
  local commit
  if [[ -n "${NATIVE_SHELL_STAMP_COMMIT:-}" ]]; then
    printf '%s' "$NATIVE_SHELL_STAMP_COMMIT"
    return 0
  fi
  commit=$(git rev-parse HEAD 2>/dev/null || true)
  if [[ -z "$commit" ]]; then
    echo "ERROR: could not read the commit being applied (git rev-parse HEAD in $(pwd), and NATIVE_SHELL_STAMP_COMMIT unset). An empty stamp would leave the upload gate unable to tell a fresh binary from a stale one, so this fails rather than stamping nothing." >&2
    return 1
  fi
  printf '%s' "$commit"
}

native_shell_stamp_app() {
  local appdelegate="$1"
  local commit first_stamp_line

  if [[ ! -f "$appdelegate" ]]; then
    echo "ERROR: $appdelegate not found — the App binary cannot be stamped, and an unstamped binary is refused at the upload gate." >&2
    return 1
  fi

  commit=$(native_shell_seam_commit) || return 1

  first_stamp_line=$(grep -nF -e "$NATIVE_SHELL_BUILD_STAMP_MARKER" "$appdelegate" | head -1 | cut -d: -f1 || true)
  if [[ -n "$first_stamp_line" ]]; then
    head -n "$((first_stamp_line - 1))" "$appdelegate" > "$appdelegate.stamp.tmp"
    mv "$appdelegate.stamp.tmp" "$appdelegate"
  fi

  awk 'NF{last=NR} {line[NR]=$0} END{for (i=1;i<=last;i++) print line[i]}' \
    "$appdelegate" > "$appdelegate.stamp.tmp"
  mv "$appdelegate.stamp.tmp" "$appdelegate"

  cat >> "$appdelegate" <<SWIFT_BUILD_STAMP

${NATIVE_SHELL_BUILD_STAMP_MARKER} ======================================================
@objc(NativeShellBuildStamp)
public final class NativeShellBuildStamp: NSObject {
    @objc public static var appCommit: String { "${NATIVE_SHELL_APP_STAMP_MARKER}=${commit}" }
}
SWIFT_BUILD_STAMP
  echo "OK: stamped App binary with commit ${commit} in $appdelegate"
}

native_shell_stamp_widget() {
  local widget_dest="$1"
  local commit

  if [[ ! -d "$widget_dest" ]]; then
    echo "ERROR: $widget_dest not found — the widget sources have not been copied yet, so stamping here would write into nothing and the extension would ship unstamped." >&2
    return 1
  fi

  commit=$(native_shell_seam_commit) || return 1

  cat > "$widget_dest/BuildStamp.swift" <<SWIFT_WIDGET_STAMP
import Foundation

@objc(NativeShellWidgetBuildStamp)
public final class NativeShellWidgetBuildStamp: NSObject {
    @objc public static var widgetCommit: String { "${NATIVE_SHELL_WIDGET_STAMP_MARKER}=${commit}" }
}
SWIFT_WIDGET_STAMP
  echo "OK: stamped widget extension with commit ${commit} in $widget_dest/BuildStamp.swift"
}
