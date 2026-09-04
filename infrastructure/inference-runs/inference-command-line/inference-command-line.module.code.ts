export function formatCommandLine(command: string, args: readonly string[]): string {
  const quoted = args.map((a) => (/\s/.test(a) ? `'${a}'` : a))
  return `ops inference ${command} ${quoted.join(" ")}`.trim()
}
