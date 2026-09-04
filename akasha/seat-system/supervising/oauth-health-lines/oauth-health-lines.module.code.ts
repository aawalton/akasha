export function terminalErrorSummary(code: string | null | undefined): string {
  return code === "invalid_grant"
    ? "OAuth refresh token expired or revoked"
    : code === "invalid_client"
      ? "OAuth client_id no longer recognized"
      : `OAuth refresh terminal error (${code ?? "unknown"})`
}

export function terminalErrorLine(
  account: string,
  reason: { code?: string | null; description?: string | null },
  logPrefix: string
): string {
  return (
    `${logPrefix} ${terminalErrorSummary(reason.code)} for account=${account} — credential refresh stopped. ` +
    `Run \`ops seat resume\` after re-authenticating to resume.` +
    (reason.description != null ? ` Server said: ${reason.description}` : "")
  )
}

export function reportTerminalOAuthError(
  account: string,
  reason: { code?: string | null; description?: string | null },
  logPrefix: string
): undefined {
  console.error(terminalErrorLine(account, reason, logPrefix))
}

export function reportOAuthRecovered(
  account: string,
  reason: string,
  logPrefix: string
): undefined {
  console.log(
    `${logPrefix} Cleared OAuth terminal flag for account=${account} (${reason}) — the seat is answering again.`
  )
}
