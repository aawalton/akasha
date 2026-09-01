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

function readSortOrder(row: ViewRow): number {
  const raw = row.properties.sort_order
  return typeof raw === "number" ? raw : 0
}

function asViewDataJSON(value: Record<string, unknown> & { version: 1 }): ViewDataJSON {
  return value as ViewDataJSON
}

function buildViewProperties(args: {
  name: string
  data: ViewDataJSON
  sortOrder: number
  ownerNavItemId: string
}) {
  return [
    { propertyId: "title", value: args.name },
    { propertyId: "owner", value: args.ownerNavItemId },
    { propertyId: "config", value: args.data },
    { propertyId: "sort_order", value: args.sortOrder },
  ]
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
        sortOrder: state.length,
        ownerNavItemId: ctx.ownerNavItemId,
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
        sortOrder: sourceIndex + 1,
        ownerNavItemId: ctx.ownerNavItemId,
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
      propertyId: "sort_order",
      value: readSortOrder(row) + 1,
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
    effects.push({ kind: "setProperty", pageId: id, propertyId: "sort_order", value: i })
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
