#!/usr/bin/env bash
# Copy the iOS components an app's widget extension compiles into that extension.
#
# Which components those are is stated on the app's akasha ios-app page, and the
# mobile command driving this build exports them as NATIVE_SHELL_COMPONENTS. It
# cannot be read off the Swift: a Swift target names no imports between its own
# files, so no source says which sources stand beside it.
#
# Nothing here globs the shared directory. That directory holds the components of
# every app, and copying all of them into one extension would put two definitions
# of the same symbol into one target, which does not compile.

copy_widget_components() {
  local shared_dir="$1"
  local dest="$2"
  local named="$3"

  if [[ ! -d "$shared_dir" ]]; then
    echo "ERROR: $shared_dir not found — the shared widget components are authored there and this extension cannot compile without them." >&2
    return 1
  fi

  local component
  local copied=0
  for component in $named; do
    if [[ ! -f "$shared_dir/$component" ]]; then
      echo "ERROR: $shared_dir/$component not found — the ios-app page names it among the components this extension compiles, and no file stands there. A component named and missing is a build that would fail later with an undefined symbol." >&2
      return 1
    fi
    cp "$shared_dir/$component" "$dest"/
    copied=$((copied + 1))
  done

  if [[ "$copied" -eq 0 ]]; then
    echo "ERROR: the ios-app page names no components, so nothing was copied into $dest. An extension compiling none of the shared components draws no ring." >&2
    return 1
  fi

  echo "OK: copied $copied named component(s) into $dest"
}
