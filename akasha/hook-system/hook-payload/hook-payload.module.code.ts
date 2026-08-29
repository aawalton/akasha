export function payloadOf(command: string, from = ""): string {
  return JSON.stringify({ tool_name: "Bash", tool_input: { command }, cwd: from })
}
