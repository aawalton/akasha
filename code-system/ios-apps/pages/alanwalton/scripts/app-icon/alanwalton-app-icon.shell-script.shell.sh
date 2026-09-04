#!/usr/bin/env bash
# Sourced by alanwalton-ios-seam, in the shell that runs it, and cut from
# 10-xcode-project.sh when that seam moved into akasha. It reads the names
# the seam set and is not a program of its own.
mkdir -p "$APPICONSET"
rm -f "$APPICONSET"/*.png
cp "$ICON_SOURCE" "$APPICONSET/AppIcon-512@2x.png"
cat > "$APPICONSET/Contents.json" <<'JSON'
{
  "images" : [
    {
      "filename" : "AppIcon-512@2x.png",
      "idiom" : "universal",
      "platform" : "ios",
      "size" : "1024x1024"
    }
  ],
  "info" : {
    "author" : "xcode",
    "version" : 1
  }
}
JSON
echo "OK: installed 1024 app icon into $APPICONSET"
