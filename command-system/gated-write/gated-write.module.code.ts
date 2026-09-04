const FAILED = /^\s*\[[a-z-]+\]\s+fail\b/

export interface Run {
  readonly code: number
  readonly output: string
}

export type Outcome =
  | { readonly kind: "unstated" }
  | { readonly kind: "unchanged" }
  | { readonly kind: "written" }
  | { readonly kind: "removed" }
  | { readonly kind: "refused"; readonly detail: string }

export function whyRefused(report: string): string {
  const failed = report.split("\n").filter((line) => FAILED.test(line))
  return (failed.length === 0 ? report.trim() : failed.join("; ")).trim()
}
