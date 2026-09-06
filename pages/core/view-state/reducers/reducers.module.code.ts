import { isJson } from "@akasha/utils-narrow/is-json"
import { isRecord } from "@akasha/utils-narrow/is-record"
import { defaultViewData, type ViewDataJSON } from "../../schema/view-data/view-data.module.code.ts"
import type {
  CreateViewArgs,
  DeleteViewArgs,
  DuplicateViewArgs,
  JsonPatchOp,
  ReducerCtx,
  RenameViewArgs,
  ReorderViewsArgs,
  UpdateViewConfigArgs,
  ViewEffect,
  ViewRow,
} from "../view-state-change/view-state-change.module.code.ts"

function escapePointer(segment: string): string {
  return segment.replace(/~/g, "~0").replace(/\//g, "~1")
}

function readViewPlace(row: ViewRow): number {
  const raw = row.properties.viewPlace
  return typeof raw === "number" ? raw : 0
}

function asViewDataJSON(value: Record<string, unknown> & { version: 1 }): ViewDataJSON {
  return value as ViewDataJSON
}

// A VIEW IS REACHED BY A SLUG NOBODY TYPED. Every page carries a slug, and a view's is derived
// from the name given it, under the nav item's own slug so that two nav items may each hold a
// view called the same thing. A name colliding with a view already under this nav item takes the
// next free number.
function slugForView(name: string, ownerNavSlug: string, taken: readonly ViewRow[]): string {
  const stem =
    name
      .replace(/&/g, "and")
      .replace(/[^A-Za-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase() || "view"
  const used = new Set(
    taken.map((one) => (typeof one.properties.slug === "string" ? one.properties.slug : ""))
  )
  const under = `${ownerNavSlug}-${stem}`
  if (!used.has(under)) return under
  for (let n = 2; ; n += 1) {
    const candidate = `${under}-${n}`
    if (!used.has(candidate)) return candidate
  }
}

// THE VIEW PAGE TYPE DECLARES EVERY KEY WRITTEN HERE. A key it declares nothing for is refused
// rather than kept, so writing the whole arrangement under one `config` would refuse the create
// and leave no view at all. What the arrangement holds beyond a layout and a page type is not
// written yet.
function buildViewProperties(args: {
  name: string
  data: ViewDataJSON
  viewPlace: number
  ownerNavSlug: string
  taken: readonly ViewRow[]
}) {
  const written: { propertyId: string; value: unknown }[] = [
    { propertyId: "title", value: args.name },
    { propertyId: "slug", value: slugForView(args.name, args.ownerNavSlug, args.taken) },
    { propertyId: "navSlug", value: args.ownerNavSlug },
    { propertyId: "viewPlace", value: args.viewPlace },
  ]
  if (args.data.layout !== undefined) {
    written.push({ propertyId: "layout", value: args.data.layout })
  }
  if (args.data.pageTypeSlug !== undefined) {
    written.push({ propertyId: "pageType", value: args.data.pageTypeSlug })
  }
  return written
}

export function createView(
  state: readonly ViewRow[],
  args: CreateViewArgs,
  ctx: ReducerCtx
): readonly ViewEffect[] {
  return [
    {
      kind: "createPage",
      pageId: ctx.newPageId,
      properties: buildViewProperties({
        name: args.name,
        data: args.data,
        viewPlace: state.length,
        ownerNavSlug: ctx.ownerNavSlug,
        taken: state,
      }),
    },
  ]
}

export function updateViewConfig(
  state: readonly ViewRow[],
  args: UpdateViewConfigArgs,
  _ctx: ReducerCtx
): readonly ViewEffect[] {
  const row = state.find((v) => v._id === args.id)
  if (!row) return []
  if (!isRecord(row.properties.config)) {
    const seed: ViewDataJSON = { ...args.updates, version: 1 }
    if (!isJson(seed)) return []
    return [
      {
        kind: "applyPagePatch",
        pageId: args.id,
        patch: [{ op: "add", path: "/config", value: seed }],
      },
    ]
  }

  const ops: JsonPatchOp[] = []
  for (const [key, value] of Object.entries(args.updates)) {
    if (value === undefined) continue
    if (!isJson(value)) continue
    ops.push({
      op: "add",
      path: `/config/${escapePointer(key)}`,
      value,
    })
  }
  ops.push({ op: "add", path: "/config/version", value: 1 })
  return [{ kind: "applyPagePatch", pageId: args.id, patch: ops }]
}

export function renameView(
  _state: readonly ViewRow[],
  args: RenameViewArgs,
  _ctx: ReducerCtx
): readonly ViewEffect[] {
  return [
    {
      kind: "bulkSetProperties",
      pageId: args.id,
      properties: [{ propertyId: "title", value: args.name }],
    },
  ]
}

export function duplicateView(
  state: readonly ViewRow[],
  args: DuplicateViewArgs,
  ctx: ReducerCtx
): readonly ViewEffect[] {
  const sourceIndex = state.findIndex((v) => v._id === args.sourceId)
  if (sourceIndex < 0) return []
  const source = state[sourceIndex]
  if (!source) return []

  const sourceName = typeof source.properties.title === "string" ? source.properties.title : ""
  const newName = `${sourceName} (Copy)`
  const sourceConfigRaw = source.properties.config
  const sourceConfig: ViewDataJSON = isRecord(sourceConfigRaw)
    ? asViewDataJSON({ ...defaultViewData(), ...sourceConfigRaw, version: 1 })
    : defaultViewData()

  const effects: ViewEffect[] = [
    {
      kind: "createPage",
      pageId: ctx.newPageId,
      properties: buildViewProperties({
        name: newName,
        data: sourceConfig,
        viewPlace: sourceIndex + 1,
        ownerNavSlug: ctx.ownerNavSlug,
        taken: state,
      }),
    },
  ]

  for (let i = 0; i < state.length; i++) {
    if (i <= sourceIndex) continue
    const row = state[i]
    if (!row) continue
    effects.push({
      kind: "setProperty",
      pageId: row._id,
      propertyId: "viewPlace",
      value: readViewPlace(row) + 1,
    })
  }

  return effects
}

export function reorderViews(
  state: readonly ViewRow[],
  args: ReorderViewsArgs,
  _ctx: ReducerCtx
): readonly ViewEffect[] {
  const known = new Set(state.map((v) => v._id))
  const effects: ViewEffect[] = []
  for (let i = 0; i < args.viewIds.length; i++) {
    const id = args.viewIds[i]
    if (id === undefined || !known.has(id)) continue
    effects.push({ kind: "setProperty", pageId: id, propertyId: "viewPlace", value: i })
  }
  return effects
}

export function deleteView(
  state: readonly ViewRow[],
  args: DeleteViewArgs,
  _ctx: ReducerCtx
): readonly ViewEffect[] {
  if (!state.some((v) => v._id === args.id)) return []
  return [{ kind: "deletePage", pageId: args.id }]
}
