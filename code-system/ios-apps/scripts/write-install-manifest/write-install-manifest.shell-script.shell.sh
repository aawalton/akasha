#!/usr/bin/env bash
set -euo pipefail

# The install root a native shell is built from. On the mac the build tree is an
# rsync of a few folders rather than a checkout, so the root akasha installs from
# is not there and this writes one. On a checkout the akasha manifest is already
# the root above the shell, and nothing here is called.
AT="${1:-}"
[ -n "$AT" ] || {
  echo "ERROR: name the folder to write the install root into. It is the folder the" >&2
  echo "       delivered tree is rooted at, above the shell being built." >&2
  exit 2
}
[ -d "$AT" ] || {
  echo "ERROR: $AT is not there, so there is no tree to write an install root into." >&2
  exit 1
}

DEPENDENCIES="${NATIVE_SHELL_DEPENDENCIES:?is unset. The ios-app page states tool-reached, the akasha manifest states each range, and whatever runs this build joins them and exports them. This script states no value of its own to fall back to.}"

node -e '
  const fs = require("fs");
  const [at, dependencies] = process.argv.slice(1);
  const manifest = {
    name: "native-shell-install-root",
    version: "0.0.0",
    private: true,
    dependencies: JSON.parse(dependencies),
  };
  fs.writeFileSync(at + "/package.json", JSON.stringify(manifest, null, 2) + "\n");
  console.log("OK: wrote " + Object.keys(manifest.dependencies).length + " dependencies into " + at + "/package.json");
' "$AT" "$DEPENDENCIES"
