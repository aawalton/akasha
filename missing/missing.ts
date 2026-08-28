export function isMissing(thrown: unknown): boolean {
  const code = (thrown as NodeJS.ErrnoException | null)?.code
  return code === "ENOENT" || code === "ENOTDIR"
}
