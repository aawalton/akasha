const FOLDERS = 'mkdir -p "$DATA/cache" "$DATA/models" "$DATA/inputs" "$DATA/outputs"'

export function buildingFrom(recipe: string): readonly string[] {
  return [
    FOLDERS,
    "",
    'if ! podman image exists "$IMAGE"; then',
    '  echo "==> Building $IMAGE…"',
    `  podman build -t "$IMAGE" -f "$PKG_DIR/${recipe}" "$PKG_DIR"`,
    "fi",
    "",
  ]
}
