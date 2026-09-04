export function buildNodePath(parentPath: string, key: string): string {
  return parentPath !== "" ? `${parentPath}/${key}` : key
}
