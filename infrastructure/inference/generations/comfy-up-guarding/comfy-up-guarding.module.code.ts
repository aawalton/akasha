export function guarding(): readonly string[] {
  return [
    "if ! command -v podman >/dev/null 2>&1; then",
    '  echo "ERROR: podman not found on PATH." >&2',
    "  exit 1",
    "fi",
    "",
    "if command -v getsebool >/dev/null 2>&1; then",
    '  if [ "$(getsebool container_use_devices 2>/dev/null | awk \'{print $3}\')" != "on" ]; then',
    "    echo \"ERROR: SELinux boolean 'container_use_devices' is off — GPU access will fail\" >&2",
    "    echo \"       with 'Failed to initialize NVML: Insufficient Permissions'.\" >&2",
    '    echo "       Apply the one-time host fix, also set by the workstation provisioner:" >&2',
    '    echo "         sudo setsebool -P container_use_devices on" >&2',
    "    exit 1",
    "  fi",
    "fi",
    "",
  ]
}
