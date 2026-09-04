import { listedById } from "@akasha/indexes"
import { besideAt } from "@akasha/pages-system/page-file-name"
import { canonicalize } from "@akasha/pages-system/repo-path"
import { asking, type Row } from "@akasha/pages-system-service/asking"
import type {
  DiscoveredWorkflow,
  Workflow,
  WorkflowKind,
} from "../workflow-types/workflow-types.module.code.ts"

export const WORKFLOW_TEMPLATE_PAGE_TYPE = "workflow-template"
export const DECLARATION_KEY = "declaration"
export const DECLARATION_EXTENSION = "ts"

const ID_KEY = "id"
const SLUG_KEY = "slug"
const KIND_KEY = "workflowKind"

const PAGE_KEYS: readonly string[] = [ID_KEY, SLUG_KEY, KIND_KEY]

const EVERY_KIND: Readonly<Record<WorkflowKind, true>> = {
  preparation: true,
  foundation: true,
  checks: true,
  apps: true,
  cleanup: true,
}

const KINDS_NAMED = Object.keys(EVERY_KIND)
  .map((one) => `\`${one}\``)
  .join(", ")

export interface WorkflowPage {
  readonly slug: string
  readonly kind: WorkflowKind
  readonly sourcePath: string
  readonly declarationPath: string
}

export interface DeclarationContext {
  readonly codeRoot: string
}

function textIn(row: Row, key: string): string | null {
  const held = row[key]
  return typeof held === "string" && held !== "" ? held : null
}

function kindOf(row: Row, at: string): WorkflowKind {
  const stated = textIn(row, KIND_KEY)
  if (stated === null) {
    throw new Error(
      `\`${at}\` states no \`${KIND_KEY}\`, and a workflow takes its kind from its page`
    )
  }
  if (!Object.hasOwn(EVERY_KIND, stated)) {
    throw new Error(`\`${at}\` states \`${KIND_KEY}: ${stated}\`, which is none of ${KINDS_NAMED}`)
  }
  return stated as WorkflowKind
}

function relPathOf(root: string, row: Row): string {
  const id = textIn(row, ID_KEY)
  if (id === null) {
    throw new Error(
      `a \`${WORKFLOW_TEMPLATE_PAGE_TYPE}\` page answers no \`${ID_KEY}\`, and a page's file is ` +
        "found by its id"
    )
  }
  const listed = listedById(root, id)
  if (listed === null) {
    throw new Error(
      `the index at \`${root}\` carries \`${WORKFLOW_TEMPLATE_PAGE_TYPE}\` page \`${id}\` but ` +
        "names no file for it, so what that page declares cannot be read"
    )
  }
  return listed.path
}

export function workflowPages(root: string): readonly WorkflowPage[] {
  const at = canonicalize(root)
  const asked = asking(at, { pageTypeSlug: WORKFLOW_TEMPLATE_PAGE_TYPE, keys: PAGE_KEYS })
  if ("refused" in asked) {
    throw new Error(
      `the tree at \`${at}\` answers no \`${WORKFLOW_TEMPLATE_PAGE_TYPE}\` page, so no workflow ` +
        `stands to be run: ${asked.refused}`
    )
  }
  return asked.rows.map((row) => {
    const relPath = relPathOf(at, row)
    const sourcePath = besideAt(relPath, DECLARATION_KEY, DECLARATION_EXTENSION)
    if (sourcePath === null) {
      throw new Error(
        `a \`${WORKFLOW_TEMPLATE_PAGE_TYPE}\` page stands at \`${relPath}\`, which is no ` +
          "TypeScript file, so nothing stands beside it to declare a workflow"
      )
    }
    return {
      slug: textIn(row, SLUG_KEY) ?? relPath,
      kind: kindOf(row, relPath),
      sourcePath,
      declarationPath: `${at}/${sourcePath}`,
    }
  })
}

function isWorkflowShape(obj: unknown): obj is Workflow {
  if (typeof obj !== "object" || obj === null) return false
  if (!("name" in obj) || typeof obj.name !== "string") return false
  if (!("when" in obj) || typeof obj.when !== "object" || obj.when === null) return false
  return true
}

function attachDiscovery(workflow: Workflow, page: WorkflowPage): DiscoveredWorkflow {
  return {
    ...workflow,
    declaredKind: workflow.kind,
    kind: page.kind,
    sourcePath: page.sourcePath,
  }
}

function statedBy(held: unknown, page: WorkflowPage, context: DeclarationContext): unknown {
  if (typeof held !== "function") return held
  try {
    return (held as (context: DeclarationContext) => unknown)(context)
  } catch (cause) {
    throw new Error(
      `\`${page.sourcePath}\` states \`${page.slug}\` as a function of the tree it runs over, and ` +
        `that function refused the code root \`${context.codeRoot}\` it was handed: ` +
        `${cause instanceof Error ? cause.message : String(cause)}`
    )
  }
}

function workflowsIn(
  mod: Record<string, unknown>,
  page: WorkflowPage,
  context: DeclarationContext
): readonly DiscoveredWorkflow[] {
  const stated = statedBy(mod.default, page, context)
  if (isWorkflowShape(stated)) return [attachDiscovery(stated, page)]
  if (Array.isArray(stated)) {
    const made = stated.filter(isWorkflowShape).map((one) => attachDiscovery(one, page))
    if (made.length > 0) return made
  }

  const held: DiscoveredWorkflow[] = []
  for (const [exportName, exportValue] of Object.entries(mod)) {
    if (exportName === "default") continue
    if (Array.isArray(exportValue)) {
      for (const item of exportValue) {
        if (isWorkflowShape(item)) held.push(attachDiscovery(item, page))
      }
      continue
    }
    if (isWorkflowShape(exportValue)) held.push(attachDiscovery(exportValue, page))
  }
  return held
}

export async function loadWorkflowPage(
  page: WorkflowPage,
  context: DeclarationContext
): Promise<readonly DiscoveredWorkflow[]> {
  let mod: Record<string, unknown>
  try {
    mod = await import(`${page.declarationPath}?v=${Date.now()}`)
  } catch (cause) {
    throw new Error(
      `\`${page.sourcePath}\` did not load, so what \`${page.slug}\` runs is unknown: ${cause instanceof Error ? cause.message : String(cause)}`
    )
  }

  const held = workflowsIn(mod, page, context)
  if (held.length === 0) {
    throw new Error(
      `\`${page.sourcePath}\` exports no workflow, and \`${page.slug}\` is a page that states one`
    )
  }
  return held
}

export async function discoverWorkflows(
  root: string,
  context: DeclarationContext
): Promise<readonly DiscoveredWorkflow[]> {
  const pages = workflowPages(root)
  const loaded = await Promise.all(pages.map((one) => loadWorkflowPage(one, context)))
  return loaded.flat()
}
