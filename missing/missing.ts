/**
 * Whether a failed filesystem call failed because the path names nothing.
 *
 * A READER MUST TELL ABSENCE FROM A FAULT BEFORE IT ANSWERS EMPTY. `readFileSync` raises for a file
 * that is not there and for a file it was not allowed to open, and a reader that catches both and
 * returns nothing reports the same empty for a page that has no sidecar and for a sidecar it could
 * not read. Only the first of those is true. The second is a fault wearing the shape of an answer,
 * and the caller writes on top of it.
 *
 * ONLY THE PATH-NAMES-NOTHING CODES COUNT AS MISSING. `ENOENT` is no such entry; `ENOTDIR` is a
 * component of the path that is not a directory, so the entry could not exist either. Everything
 * else — `EACCES`, `EISDIR`, `EIO`, `ELOOP`, `EMFILE` — describes a path that is or may be there and
 * a call that could not complete, which is a fault and belongs to the caller rather than swallowed.
 *
 * A THROW THAT CARRIES NO `code` IS NOT MISSING, because nothing said it was.
 */
export function isMissing(thrown: unknown): boolean {
  const code = (thrown as NodeJS.ErrnoException | null)?.code
  return code === "ENOENT" || code === "ENOTDIR"
}
