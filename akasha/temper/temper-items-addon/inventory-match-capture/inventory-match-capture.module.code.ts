export function captureOrNull(captured: string | undefined): string | null {
  return captured === undefined ? null : captured
}
