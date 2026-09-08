export function installDepsCommands(commitSha: string): readonly string[] {
  return [
    "mkdir -p /ci-storage/bun-cache /ci-storage/tmp",
    `INSTALL_DIR=/ci-storage/installs/${commitSha}`,
    "if [ -f $INSTALL_DIR/.install-done ]; then",
    `  echo "Reusing installed dependencies (commit ${commitSha})"`,
    "else",
    `  echo "Installing dependencies (commit ${commitSha})..."`,
    "  mkdir -p $INSTALL_DIR",
    '  rm -rf "$WS/node_modules" 2>/dev/null || true',
    '  cd "$WS" && bun install --frozen-lockfile || exit 1',
    '  mv "$WS/node_modules" $INSTALL_DIR/node_modules || exit 1',

    "  for link in $(find $INSTALL_DIR/node_modules -maxdepth 3 -type l); do",
    '    target=$(readlink "$link")',
    '    case "$target" in ../*) ;; *) continue ;; esac',
    '    rel="${link#$INSTALL_DIR/node_modules/}"',
    '    abs=$(realpath -m "$WS/node_modules/$(dirname "$rel")/$target")',
    '    [ -d "$abs" ] && ln -sfn "$abs" "$link"',
    "  done",
    "  touch $INSTALL_DIR/.install-done",
    "fi",

    'if [ ! -L "$WS/node_modules" ]; then',
    '  rm -rf "$WS/node_modules" 2>/dev/null || true',
    '  ln -s $INSTALL_DIR/node_modules "$WS/node_modules" || exit 1',
    "fi",

    'for cfg in $(find "$WS" -name vite.config.ts -not -path "*/node_modules/*"); do',
    '  mkdir -p "$(dirname "$cfg")/node_modules" || exit 1',
    "done",
  ]
}
