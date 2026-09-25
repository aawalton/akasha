export interface SandboxLibraryCatalogData {
  readonly apiVersion: number
  readonly globals: Record<string, string>
  readonly members: Record<string, readonly string[]>
}
