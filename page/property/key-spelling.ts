import { refusalText } from "../../refusal/refusal.ts"

export function kebabized(key: string): string {
  return key.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()
}

export function undeclaredKey(
  key: string,
  slug: string,
  declares: (name: string) => boolean
): string {
  const meant = kebabized(key)
  return meant !== key && declares(meant)
    ? refusalText("page-key-spelled-camel", { key, meant, slug })
    : refusalText("page-key-undeclared", { key, slug })
}
