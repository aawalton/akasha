const SUPERVISOR_CMDLINE_RE = /bun.*supervisor\.ts/

export function isSupervisorCmdline(cmdline: string): boolean {
  return SUPERVISOR_CMDLINE_RE.test(cmdline)
}
