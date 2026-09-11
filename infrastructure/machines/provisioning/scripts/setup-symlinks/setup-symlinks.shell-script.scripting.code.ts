import { dirname } from "node:path"
import { fileOf } from "akasha/pages/indexes/property-file/property-file.module.code.ts"
import { valuedAt, valuesOfType } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"

const SCRIPT = "shell-script"

const SHELL = "shell"

const OWN = "setup-symlinks"

const ROOTS = "repo-roots"

const LINKING = "link-making"

const PLACED = "provisioned-file"

const CONTENT = "content"

const PYTHON_MODULE = "python-module"

const PYTHON = "python"

const BTW5 = "btw5"

const GAP = " "

const AT = "/"

const INDENT = "  "

type Placing = {
  readonly slug: string
  readonly pad: number
  readonly at: string
}

const DOTFILES: readonly Placing[] = [
  { slug: "bashrc", pad: 3, at: "$HOME/.bashrc" },
  { slug: "profile", pad: 2, at: "$HOME/.profile" },
  { slug: "tmux-config", pad: 7, at: "$HOME/.tmux.conf" },
  { slug: "git-config", pad: 8, at: "$HOME/.gitconfig" },
  { slug: "home-search-ignore", pad: 1, at: "$HOME/.ignore" },
  { slug: "git-global-ignore", pad: 2, at: "$HOME/.config/git/ignore" },
  { slug: "repos-editor-settings", pad: 1, at: "$REPOS/.vscode/settings.json" },
]

const LAUNCHERS: readonly Placing[] = [
  { slug: "akasha-launcher", pad: 1, at: "$HOME/.local/bin/akasha" },
  { slug: "rg", pad: 25, at: "$HOME/.local/bin/rg" },
  { slug: "find-session", pad: 5, at: "$HOME/.local/bin/find-session" },
  { slug: "ci-cost-snapshot", pad: 1, at: "$HOME/.local/bin/ci-cost-snapshot" },
]

const WALLPAPER: Placing = {
  slug: "wallpaper-black",
  pad: 1,
  at: "$HOME/.local/bin/wallpaper-black",
}

const BTW5_ON_PATH: Placing = { slug: BTW5, pad: 1, at: "$HOME/.local/bin/btw5" }

const ON_LINUX: readonly Placing[] = [
  {
    slug: "container-short-names",
    pad: 1,
    at: "$HOME/.config/containers/registries.conf.d/00-short-name-permissive.conf",
  },
  {
    slug: "container-insecure-registries",
    pad: 1,
    at: "$HOME/.config/containers/registries.conf.d/01-insecure-cluster-registry.conf",
  },
  {
    slug: "wallpaper-black-launcher",
    pad: 1,
    at: "$HOME/.local/share/applications/wallpaper-black.desktop",
  },
]

function upTwice(path: string): string {
  return dirname(dirname(path))
}

function scriptsUnder(given: string | Reading): string {
  return upTwice(valuedAt(given, SCRIPT, OWN).path)
}

function filesUnder(given: string | Reading): string {
  const found = new Set<string>()
  for (const one of valuesOfType(given, PLACED)) found.add(upTwice(one.path))
  const [only] = found
  if (found.size !== 1 || only === undefined) {
    throw new Error(`the \`${PLACED}\` pages sit under ${found.size} folders rather than one`)
  }
  return only
}

function beneath(folder: string, path: string): string {
  const under = `${folder}${AT}`
  if (!path.startsWith(under)) throw new Error(`\`${path}\` sits outside \`${folder}\``)
  return path.slice(under.length)
}

function contentAt(given: string | Reading, slug: string): string {
  const page = valuedAt(given, PLACED, slug)
  return beneath(filesUnder(given), fileOf(given, page, PLACED, CONTENT))
}

function shellAt(given: string | Reading, slug: string): string {
  const page = valuedAt(given, SCRIPT, slug)
  return beneath(scriptsUnder(given), fileOf(given, page, SCRIPT, SHELL))
}

function linked(indent: string, at: string, one: Placing): string {
  return `${indent}link "${at}"${GAP.repeat(one.pad)}"${one.at}"`
}

function placed(given: string | Reading, indent: string, one: Placing): string {
  return linked(indent, `$FILES${AT}${contentAt(given, one.slug)}`, one)
}

function launched(given: string | Reading, indent: string, one: Placing): string {
  return linked(indent, `$SCRIPTS${AT}${shellAt(given, one.slug)}`, one)
}

function opening(given: string | Reading): readonly string[] {
  const files = filesUnder(given)
  const linking = shellAt(given, LINKING)
  return [
    "#!/usr/bin/env bash",
    "#",
    `# Every file this places is a \`${PLACED}\` page under`,
    `# akasha${AT}${files}. The page states where its body`,
    "# goes, whether the body is linked or copied, which machines it is for, and what makes",
    "# the placing take effect. This script is the placer; the pages are the table.",
    "",
    "set -euo pipefail",
    "",
    'HERE="$(cd -- "$(dirname -- "$(readlink -f -- "$0")")" && pwd -P)"',
    `. "$HERE${AT}..${AT}${shellAt(given, ROOTS)}"`,
    'REPOS="$(dirname -- "$AKASHA_ROOT")"',
    "",
    `FILES="$AKASHA_ROOT${AT}${files}"`,
    `SCRIPTS="$AKASHA_ROOT${AT}${scriptsUnder(given)}"`,
    "",
    `# shellcheck source=..${AT}${linking}`,
    `. "$SCRIPTS${AT}${linking}"`,
    "",
    'echo "Setting up dotfile symlinks..."',
    ...DOTFILES.map((one) => placed(given, "", one)),
    "",
    'echo "Setting up the launchers on PATH..."',
    ...LAUNCHERS.map((one) => launched(given, "", one)),
  ]
}

function onLinux(given: string | Reading): readonly string[] {
  const page = valuedAt(given, PYTHON_MODULE, BTW5)
  const at = `$AKASHA_ROOT${AT}${fileOf(given, page, PYTHON_MODULE, PYTHON)}`
  return [
    'if [ "$(uname)" != "Darwin" ]; then',
    launched(given, INDENT, WALLPAPER),
    linked(INDENT, at, BTW5_ON_PATH),
    ...ON_LINUX.map((one) => placed(given, INDENT, one)),
    "fi",
    "",
  ]
}

function keepaliveIn(given: string | Reading): readonly string[] {
  return [
    'if [ "$(uname)" = "Darwin" ]; then',
    '  echo "Skipping /etc/sysctl.d symlink (Linux-only; macOS detected)."',
    "else",
    '  echo "Setting up system config symlinks (sudo required)..."',
    `  ETC_SYSCTL_SRC="$FILES${AT}${contentAt(given, "claude-keepalive-sysctl")}"`,
    '  ETC_SYSCTL_DST="/etc/sysctl.d/99-claude-keepalive.conf"',
    '  if [ -L "$ETC_SYSCTL_DST" ] && [ "$(readlink "$ETC_SYSCTL_DST")" = "$ETC_SYSCTL_SRC" ]; then',
    '    echo "  $ETC_SYSCTL_DST already linked"',
    "  else",
    '    if [ -e "$ETC_SYSCTL_DST" ] && [ ! -L "$ETC_SYSCTL_DST" ]; then',
    '      sudo mv "$ETC_SYSCTL_DST" "${ETC_SYSCTL_DST}.bak"',
    '      echo "  backed up $ETC_SYSCTL_DST -> ${ETC_SYSCTL_DST}.bak"',
    "    fi",
    '    [ -L "$ETC_SYSCTL_DST" ] && sudo rm "$ETC_SYSCTL_DST"',
    '    sudo ln -s "$ETC_SYSCTL_SRC" "$ETC_SYSCTL_DST"',
    '    echo "  $ETC_SYSCTL_DST -> $ETC_SYSCTL_SRC"',
    "    sudo sysctl --system >/dev/null",
    '    echo "  applied via sudo sysctl --system"',
    "  fi",
    "fi",
    "",
  ]
}

function udevIn(given: string | Reading): readonly string[] {
  return [
    'if [ "$(uname)" != "Darwin" ]; then',
    `  ETC_UDEV_SRC="$FILES${AT}${contentAt(given, "btw5-udev-rule")}"`,
    '  ETC_UDEV_DST="/etc/udev/rules.d/70-btw5.rules"',
    '  if [ -L "$ETC_UDEV_DST" ] && [ "$(readlink "$ETC_UDEV_DST")" = "$ETC_UDEV_SRC" ]; then',
    '    echo "  $ETC_UDEV_DST already linked"',
    "  else",
    '    if [ -e "$ETC_UDEV_DST" ] && [ ! -L "$ETC_UDEV_DST" ]; then',
    '      sudo mv "$ETC_UDEV_DST" "${ETC_UDEV_DST}.bak"',
    '      echo "  backed up $ETC_UDEV_DST -> ${ETC_UDEV_DST}.bak"',
    "    fi",
    '    [ -L "$ETC_UDEV_DST" ] && sudo rm "$ETC_UDEV_DST"',
    '    sudo ln -s "$ETC_UDEV_SRC" "$ETC_UDEV_DST"',
    '    echo "  $ETC_UDEV_DST -> $ETC_UDEV_SRC"',
    "    sudo udevadm control --reload",
    "    sudo udevadm trigger --subsystem-match=hidraw --subsystem-match=usb",
    '    echo "  applied via udevadm reload + trigger"',
    "  fi",
    "fi",
    "",
  ]
}

function oomdIn(given: string | Reading): readonly string[] {
  return [
    'if [ "$(uname)" != "Darwin" ]; then',
    `  ETC_OOMD_SRC="$FILES${AT}${contentAt(given, "swap-used-limit")}"`,
    '  ETC_OOMD_DST="/etc/systemd/oomd.conf.d/99-swap-used-limit.conf"',
    '  if [ -f "$ETC_OOMD_DST" ] && [ ! -L "$ETC_OOMD_DST" ] && cmp -s "$ETC_OOMD_SRC" "$ETC_OOMD_DST"; then',
    '    echo "  $ETC_OOMD_DST already current"',
    "  else",
    "    sudo mkdir -p /etc/systemd/oomd.conf.d",
    '    sudo rm -f "$ETC_OOMD_DST"',
    '    sudo install -m 0644 -T "$ETC_OOMD_SRC" "$ETC_OOMD_DST"',
    '    echo "  installed (copied) $ETC_OOMD_DST"',
    "    sudo systemctl restart systemd-oomd",
    '    echo "  applied via systemctl restart systemd-oomd"',
    "  fi",
    "fi",
    "",
  ]
}

function swapIn(given: string | Reading): readonly string[] {
  return [
    'if [ "$(uname)" != "Darwin" ]; then',
    `  ETC_SWAPUNIT_SRC="$FILES${AT}${contentAt(given, "swapfile-unit")}"`,
    '  ETC_SWAPUNIT_DST="/etc/systemd/system/var-swap-swapfile.swap"',
    '  if [ -f "$ETC_SWAPUNIT_DST" ] && [ ! -L "$ETC_SWAPUNIT_DST" ] && cmp -s "$ETC_SWAPUNIT_SRC" "$ETC_SWAPUNIT_DST"; then',
    '    echo "  $ETC_SWAPUNIT_DST already current"',
    "  else",
    '    sudo rm -f "$ETC_SWAPUNIT_DST"',
    '    sudo install -m 0644 -T "$ETC_SWAPUNIT_SRC" "$ETC_SWAPUNIT_DST"',
    '    echo "  installed (copied) $ETC_SWAPUNIT_DST"',
    "    sudo systemctl daemon-reload",
    "  fi",
    "  sudo systemctl enable var-swap-swapfile.swap >/dev/null 2>&1 || true",
    "  if [ -f /var/swap/swapfile ]; then",
    "    sudo systemctl start var-swap-swapfile.swap || true",
    '    echo "  enabled + activated var-swap-swapfile.swap"',
    "  else",
    '    echo "  enabled var-swap-swapfile.swap (swapfile absent — provision-workstation.sh step 9 creates + starts it)"',
    "  fi",
    "fi",
    "",
  ]
}

function closing(): readonly string[] {
  return [
    'echo "Ensuring headscale control-plane VIP in /etc/hosts (sudo required)..."',
    'HEADSCALE_HOSTS_LINE="192.168.68.240 headscale.alanwalton.com"',
    'if grep -qF "$HEADSCALE_HOSTS_LINE" /etc/hosts 2>/dev/null; then',
    '  echo "  headscale.alanwalton.com VIP entry already present"',
    "else",
    "  printf '\\n# headscale control-plane: intra-LAN MetalLB VIP\\n%s\\n' \\",
    '    "$HEADSCALE_HOSTS_LINE" | sudo tee -a /etc/hosts >/dev/null',
    "  echo \"  added '$HEADSCALE_HOSTS_LINE' to /etc/hosts\"",
    "fi",
    "",
    "link_summary",
    "",
    'echo "Done."',
  ]
}

export function bodyIn(given: string | Reading): string {
  const lines = [
    ...opening(given),
    ...onLinux(given),
    ...keepaliveIn(given),
    ...udevIn(given),
    ...oomdIn(given),
    ...swapIn(given),
    ...closing(),
  ]
  return `${lines.join("\n")}\n`
}
