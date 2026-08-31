#!/usr/bin/env bash
# Sourced by smilingjenny-ios-seam, in the shell that runs it. Reads WIDGET_ENABLED
# and WIDGET_DEST from the seam, and NATIVE_SHELL_RING_CREDENTIAL from the build.
# The credential is never committed: it arrives in the environment, is escaped for
# the Swift string literal it becomes, and only the COUNT of substitutions is
# logged.
RING_CREDENTIAL_PLACEHOLDER="__RING_CREDENTIAL_NOT_SUBSTITUTED__"

if [[ "$WIDGET_ENABLED" != "1" ]]; then
  echo "OK: ring-credential seam (§5) SKIPPED — §2 copied no widget sources (NATIVE_SHELL_WIDGET=0)."
elif [[ -z "${NATIVE_SHELL_RING_CREDENTIAL:-}" ]]; then
  echo "WARNING: NATIVE_SHELL_RING_CREDENTIAL is unset or empty — the widget sources keep" >&2
  echo "         their placeholder, so THIS BUILD'S TILE WILL READ AS REFUSED (lock glyph," >&2
  echo "         'Update app') and will never show a count. Set the variable and re-sync to" >&2
  echo "         create a build that can read the route." >&2
else
  # shellcheck disable=SC2016  # every `$` inside the block below sits in a JS
  node -e '
    const fs = require("fs");
    const path = require("path");
    const dir = process.argv[1];
    const placeholder = process.argv[2];
    const credential = process.env.NATIVE_SHELL_RING_CREDENTIAL || "";
    if (credential === "") {
      console.error("ERROR: NATIVE_SHELL_RING_CREDENTIAL is empty at the substitution.");
      process.exit(1);
    }
    // WHAT LANDS IS A SWIFT STRING LITERAL, so the value is escaped for one. A
    // credential carrying a quote or a backslash would otherwise close the literal
    // early and the extension would fail to COMPILE — at the archive, on the mac,
    // hundreds of lines into an xcodebuild log, for a reason that reads as nothing
    // to do with a credential.
    //
    // A control character is refused rather than escaped. It could be spelled `\n`
    // and compiled, but a credential with a newline in it is far more likely to be a
    // file read with its trailing newline attached than a value anybody meant, and
    // baking that produces a header the route silently rejects.
    if (/[\x00-\x1f\x7f]/.test(credential)) {
      console.error(
        "ERROR: NATIVE_SHELL_RING_CREDENTIAL contains a control character (a trailing " +
        "newline from `$(cat …)` is the usual cause). Pass the value alone.");
      process.exit(1);
    }
    const literal = credential.replace(/\\/g, "\\\\").replace(/"/g, "\\\"");
    // A literal split/join rather than a regex for the search too: `$&` and `$1` mean
    // something to a replacement string, so a regex would mangle exactly the values
    // nobody would think to test with.
    let replaced = 0;
    let files = 0;
    for (const name of fs.readdirSync(dir).sort()) {
      if (!name.endsWith(".swift")) continue;
      const file = path.join(dir, name);
      const parts = fs.readFileSync(file, "utf8").split(placeholder);
      if (parts.length === 1) continue;
      fs.writeFileSync(file, parts.join(literal));
      replaced += parts.length - 1;
      files += 1;
    }
    // NOT FINDING THE PLACEHOLDER IS AN ERROR, unlike not having a credential. It
    // means the Swift constant moved or was renamed, so this run would produce a
    // build that reads as refused while whoever created it supplied a working credential
    // and has every reason to believe it went in. That is the silent-wrong-build
    // class, and the loud failure is the whole point of the check.
    if (replaced === 0) {
      console.error(
        "ERROR: no widget source in " + dir + " carries " + placeholder + " — the ring " +
        "credential could not be substituted. RingCredential.baked in the " +
        "smilingjenny-widget-feed ios-component is where it belongs; if it moved, this " +
        "section and that constant have to move together.");
      process.exit(1);
    }
    // The COUNT and never the value.
    console.log(
      "OK: substituted the ring credential into " + replaced + " place(s) across " +
      files + " file(s) in " + dir);
  ' "$WIDGET_DEST" "$RING_CREDENTIAL_PLACEHOLDER"
fi
