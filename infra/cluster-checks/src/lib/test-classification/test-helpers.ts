import { detectRequiredType } from "../../../../../akasha/checks/cluster-checks/modules/test-classification/test-classification.module.code.ts"

export const tok = (...parts: readonly string[]) => parts.join("")
export const fromImport = (spec: string) => `${tok("fr", "om ")}"${spec}"`

export const PGLITE_SPEC = tok("@electric-", "sql/pglite")
export const UTILS_TEST = tok("@shared/utils", "-test")
export const SUPABASE_JS = tok("@supabase/", "supabase-js")
export const SUPABASE_SSR = tok("@supabase/", "ssr")
export const TESTING_LIBRARY = tok("@testing-", "library/react")
export const FAST_CHECK = tok("fast", "-check")
export const PLAYWRIGHT_CORE = fromImport(tok("playwright", "-core"))
export const PLAYWRIGHT_CORE_BARE = tok("playwright", "-core")
export const BROWSER_TEST_HARNESS = tok("@shared/browser", "-test-harness")
export const HAPPY_DOM = tok("happy", "-dom")
export const RENDER_HOOK = tok("render", "Hook(")
export const SUPABASE_ENV = tok("process.env.", "SUPABASE_")
export const NEXT_PUBLIC_SUPABASE_ENV = tok("process.env.", "NEXT_PUBLIC_SUPABASE_")
export const SMOKE_SKIP_MARKER = `[${tok("smoke", " skip")}]`
export const INTEGRATION_MARKER = tok("// test-", "classification: integration")
export const DATA_MARKER = tok("// test-", "classification: data")
export const MODEL_MARKER = tok("// test-", "classification: model")
export const CLI_MARKER = tok("// test-", "classification: cli")
export const UNIT_MARKER = tok("// test-", "classification: unit")

export const detect = (content: string, path = "x.unit.test.ts") =>
  detectRequiredType(content, path)

export const SCANNER_FIXTURE = `const ENGINE = "${PGLITE_SPEC}"`
