import * as pagesAccess from "./index"

const defaults = {
  applySelect: pagesAccess.applySelect,
  bulkUpsertPages: async () => [],
  captureError: async () => ({ id: "captured" }),
  collectPages: async () => [],
  comparePageSeq: pagesAccess.comparePageSeq,
  completePage: async () => ({
    id: "x",
    status: "completed" as const,
    recurring: false,
    softDeleted: true,
    completedAt: 0,
  }),
  createPage: async (): Promise<never> => {
    throw new Error("pagesAccessMock.createPage not overridden")
  },
  createPageIfAbsent: async (): Promise<never> => {
    throw new Error("pagesAccessMock.createPageIfAbsent not overridden")
  },
  createPageType: async (): Promise<never> => {
    throw new Error("pagesAccessMock.createPageType not overridden")
  },
  DETAIL_CONFIG_KEY: pagesAccess.DETAIL_CONFIG_KEY,
  detailConfigFor: async () => null,
  extractRelationContainment: () => null,
  flattenRow: pagesAccess.flattenRow,
  getDescendantPageTypeSlugs: async () => [],
  getDetailConfig: async () => null,
  getFileDetailConfig: async () => null,
  getMediaConfig: async () => null,
  getOrderedChildren: async () => [],
  getOrderedNeighbors: async () => ({ prev: null, next: null }),
  getPage: pagesAccess.getPage,
  getPageByIdSuffix: async () => null,
  getPageByIdSuffixAcrossTypes: async () => null,
  getPageTypeByPluralSlug: async () => null,
  getPageTypeBySlug: async () => null,
  getPageTypeIdBySlug: async (): Promise<never> => {
    throw new Error("pagesAccessMock.getPageTypeIdBySlug not overridden")
  },
  getPageTypeIdsBySlugs: async (): Promise<never> => {
    throw new Error("pagesAccessMock.getPageTypeIdsBySlugs not overridden")
  },
  getPages: pagesAccess.getPages,
  getPagesByRelation: async () => [],
  getPagesForView: pagesAccess.getPagesForView,
  getPropertyDefinitions: async () => [],
  getSequenceConfig: pagesAccess.getSequenceConfig,
  hardDeletePage: async () => null,
  hardDeletePageById: async () => null,
  hardDeletePageByIds: async () => [],
  hardDeletePages: async () => [],
  isPromotedKey: pagesAccess.isPromotedKey,
  NEVER_MATCH_SLUG: pagesAccess.NEVER_MATCH_SLUG,
  NEVER_MATCH_VALUE: pagesAccess.NEVER_MATCH_VALUE,
  PageTypeSlug: pagesAccess.PageTypeSlug,
  PageTypesMissing: pagesAccess.PageTypesMissing,
  PageTypesUnread: pagesAccess.PageTypesUnread,
  PageWriteError: pagesAccess.PageWriteError,
  parsePageSeq: pagesAccess.parsePageSeq,
  patchPage: async () => null,
  patchPageById: pagesAccess.patchPageById,
  patchPages: async () => [],
  patchPageTypeById: async () => null,
  patchPropertyDefinitionById: async () => null,
  PROMOTED_COLUMN: pagesAccess.PROMOTED_COLUMN,
  PROMOTED_COLUMN_KEYS: pagesAccess.PROMOTED_COLUMN_KEYS,
  recordPageView: async () => null,
  reschedulePage: async () => ({ id: "x", dueDate: "2026-01-01" }),
  softDeletePage: async () => null,
  softDeletePageById: pagesAccess.softDeletePageById,
  softDeletePages: async () => [],
  streamPages: async function* () {},
  tryExtractIdEq: pagesAccess.tryExtractIdEq,
  uncompletePage: async () => ({ id: "x", status: "uncompleted" as const, snapshotId: null }),
  undeletePage: async () => null,
  undeletePageById: async () => null,
  undeletePages: async () => [],
  upsertPage: async (): Promise<never> => {
    throw new Error("pagesAccessMock.upsertPage not overridden")
  },
  upsertPages: async () => [],
} satisfies Omit<typeof pagesAccess, "Page">

export type PagesAccessMock = typeof pagesAccess

export type PagesAccessMockOverrides = Partial<Omit<PagesAccessMock, "Page">> &
  Pick<PagesAccessMock, "Page">

export function makePagesAccessMock(overrides: PagesAccessMockOverrides): PagesAccessMock {
  return { ...defaults, ...overrides }
}
