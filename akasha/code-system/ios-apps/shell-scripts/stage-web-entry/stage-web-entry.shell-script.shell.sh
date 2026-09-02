#!/usr/bin/env bash
set -euo pipefail

# Capacitor serves webDir/index.html, and copies whatever stands there into the
# native project. A shell whose product is the live site still needs a local page
# to boot from: on iOS WKWebView `errorPath` hangs on a cold start with no network,
# so the bundled entry redirects itself instead. That page is authored beside the
# app's akasha page under a name the naming grammar builds, and copied to the one
# name the web view reads.

ENTRY="${1:?is unset. Pass the web entry authored beside the ios-app page.}"
WEB_DIR="${2:-www}"

if [[ ! -f "$ENTRY" ]]; then
  echo "ERROR: no web entry at $ENTRY — Capacitor serves $WEB_DIR/index.html, and a shell built without one boots a blank page rather than redirecting to its site." >&2
  exit 1
fi

mkdir -p "$WEB_DIR"
cp "$ENTRY" "$WEB_DIR/index.html"
echo "OK: staged $ENTRY into $WEB_DIR/index.html"
