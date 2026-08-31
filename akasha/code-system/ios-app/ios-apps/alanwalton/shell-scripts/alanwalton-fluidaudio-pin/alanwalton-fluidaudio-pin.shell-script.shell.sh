#!/usr/bin/env bash
# Sourced by alanwalton-ios-seam, in the shell that runs it, and cut from
# 10-xcode-project.sh when that seam moved into akasha. It reads the names
# the seam set and is not a program of its own.
CAPAPP_SPM="ios/App/CapApp-SPM/Package.swift"
if [[ "$KOKORO_TTS_ENABLED" == "1" ]]; then
  if [[ ! -f "$CAPAPP_SPM" ]]; then
    echo "ERROR: $CAPAPP_SPM not found — run 'npx cap sync ios' first." >&2
    exit 1
  fi
  node -e '
    const fs = require("fs");
    const p = process.argv[1];
    const url = process.argv[2];
    const rev = process.argv[3];
    let src = fs.readFileSync(p, "utf8");
    if (src.includes("FluidAudio")) {
      console.log("OK: FluidAudio already present in " + p);
    } else {
      // Package-level dependency: inject after the capacitor-swift-pm package pin.
      const pkgAnchor = /\.package\(url: "https:\/\/github\.com\/ionic-team\/capacitor-swift-pm\.git"[^)]*\),?/;
      // Target-level product: inject after the Capacitor product.
      const prodAnchor = /\.product\(name: "Capacitor", package: "capacitor-swift-pm"\),?/;
      if (!pkgAnchor.test(src) || !prodAnchor.test(src)) {
        console.error("ERROR: CapApp-SPM anchors not found — Capacitor template changed; update the #15702 seam.");
        process.exit(1);
      }
      const withComma = (m) => (m.endsWith(",") ? m : m + ",");
      src = src.replace(
        pkgAnchor,
        (m) => withComma(m) + "\n        .package(url: \"" + url + "\", revision: \"" + rev + "\"),"
      );
      src = src.replace(
        prodAnchor,
        (m) => withComma(m) + "\n                .product(name: \"FluidAudio\", package: \"FluidAudio\"),"
      );
      // FluidAudio requires iOS 17.
      src = src.replace("platforms: [.iOS(.v15)]", "platforms: [.iOS(.v17)]");
      fs.writeFileSync(p, src);
      console.log("OK: injected FluidAudio SwiftPM dependency + iOS 17 platform into " + p);
    }
  ' "$CAPAPP_SPM" "$KOKORO_FLUIDAUDIO_URL" "$KOKORO_FLUIDAUDIO_REVISION"

  if grep -q "IPHONEOS_DEPLOYMENT_TARGET = 15.0;" "$PROJECT_PBXPROJ/project.pbxproj"; then
    perl -0pi -e 's/IPHONEOS_DEPLOYMENT_TARGET = 15\.0;/IPHONEOS_DEPLOYMENT_TARGET = 17.0;/g' \
      "$PROJECT_PBXPROJ/project.pbxproj"
    echo "OK: raised App target IPHONEOS_DEPLOYMENT_TARGET 15.0 -> 17.0 (FluidAudio floor)"
  else
    echo "OK: no 15.0 deployment target to raise (already >= 17)"
  fi
else
  echo "OK: KokoroTts seam disabled — FluidAudio SwiftPM dependency not injected"
fi
