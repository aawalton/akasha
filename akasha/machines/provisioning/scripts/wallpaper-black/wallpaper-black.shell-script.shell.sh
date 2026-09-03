#!/usr/bin/env bash
# Toggle bound to Meta+L via the wallpaper-black-launcher provisioned-file page's
# desktop entry + the KGlobalAccel DBus wiring in provision-workstation.sh.

set -euo pipefail

state="${XDG_CACHE_HOME:-$HOME/.cache}/wallpaper-black-state.json"

if [ -f "$state" ]; then
  saved="$(cat "$state")"
  qdbus org.kde.plasmashell /PlasmaShell org.kde.PlasmaShell.evaluateScript "
    var saved = $saved;
    var ds = desktops();
    for (var i = 0; i < ds.length && i < saved.length; i++) {
      var d = ds[i], s = saved[i];
      d.wallpaperPlugin = s.plugin;
      d.currentConfigGroup = ['Wallpaper', s.plugin, 'General'];
      if (s.Image !== '') d.writeConfig('Image', s.Image);
      if (s.Color !== '') d.writeConfig('Color', s.Color);
    }
  "
  rm "$state"
else
  mkdir -p "$(dirname "$state")"
  qdbus org.kde.plasmashell /PlasmaShell org.kde.PlasmaShell.evaluateScript '
    var out = [];
    var ds = desktops();
    for (var i = 0; i < ds.length; i++) {
      var d = ds[i];
      var rec = { plugin: d.wallpaperPlugin };
      d.currentConfigGroup = ["Wallpaper", d.wallpaperPlugin, "General"];
      rec.Image = d.readConfig("Image") + "";
      rec.Color = d.readConfig("Color") + "";
      out.push(rec);
      d.wallpaperPlugin = "org.kde.color";
      d.currentConfigGroup = ["Wallpaper", "org.kde.color", "General"];
      d.writeConfig("Color", "#000000");
    }
    print(JSON.stringify(out));
  ' > "$state"
fi
