export function stripFrontmatter(markdown: string): string {
  if (!markdown.startsWith("---\n")) return markdown
  const end = markdown.indexOf("\n---\n", 4)
  if (end === -1) return markdown
  return markdown.slice(end + 5).replace(/^\n+/, "")
}
