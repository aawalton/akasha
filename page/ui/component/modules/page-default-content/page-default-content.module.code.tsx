"use client"

import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { BadgeLayoutProvider } from "akasha/design/interface/badge/modules/badge-layout-context/badge-layout-context.module.code.tsx"
import { InlineEditableText } from "akasha/design/interface/form/modules/inline-editable-text/inline-editable-text.module.code.tsx"
import { PageLayout } from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { PAGE_TITLE_CLASSES } from "akasha/design/interface/layout/modules/page-layout-data/page-layout-data.module.code.ts"
import { simplePageSkeleton } from "akasha/design/interface/layout/modules/skeleton-presets/skeleton-presets.module.code.ts"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "akasha/design/interface/pattern/modules/empty/empty.module.code.tsx"
import { IconPicker } from "akasha/design/interface/pattern/modules/icon-picker/icon-picker.module.code.tsx"
import { expandDateMentions } from "akasha/page/core/view/modules/expand-date-mentions/expand-date-mentions.module.code.ts"
import { BlockEditor } from "akasha/page/ui/block-editor/modules/block-editor/block-editor.module.code.tsx"
import { MultiRelationPropertyBadge } from "akasha/page/ui/component/modules/multi-relation-property-badge/multi-relation-property-badge.module.code.tsx"
import { PageCover } from "akasha/page/ui/component/modules/page-cover/page-cover.module.code.tsx"
import { PageDetailHeaderMenu } from "akasha/page/ui/component/modules/page-detail-header-menu/page-detail-header-menu.module.code.tsx"
import { PageDetailProperties } from "akasha/page/ui/component/modules/page-detail-properties/page-detail-properties.module.code.tsx"
import { PageDetailReferrers } from "akasha/page/ui/component/modules/page-detail-referrers/page-detail-referrers.module.code.tsx"
import {
  hasValue,
  JsonSectionRenderer,
  ToggleSection,
} from "akasha/page/ui/component/modules/page-detail-sections/page-detail-sections.module.code.tsx"
import { PageDetailSubpages } from "akasha/page/ui/component/modules/page-detail-subpages/page-detail-subpages.module.code.tsx"
import { usePageDefaultContent } from "akasha/page/ui/component/modules/use-page-default-content/use-page-default-content.module.code.ts"
import { MarkdownRenderer } from "akasha/page/ui/markdown/modules/markdown-renderer/markdown-renderer.module.code.tsx"
import { SupabasePageResolverProvider } from "akasha/page/ui/supabase/modules/page-resolver-provider/page-resolver-provider.module.code.tsx"
import {
  type PageTypeSlug,
  toPageTypeSlug,
} from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"

export function PageDefaultContent({
  pageTypeSlug,
  id,
}: {
  pageTypeSlug: PageTypeSlug
  id: string
}) {
  const {
    page,
    isLoading,
    pageTypes,
    relatedPages,
    targetSlug,
    data,
    dataWithComputed,
    coverUrl,
    handleCoverChange,
    displayIconName,
    handleIconChange,
    handleTitleChange,
    handlePropertyChange,
    handlePageNavigate,
    propertyListDefs,
    richDocumentDefs,
    multiRelationDefs,
    markdownDefs,
    jsonDefs,
    pageTypeId,
    pageTypePropertiesMap,
    pageTypeSlugById,
    allDefinitions,
  } = usePageDefaultContent({ pageTypeSlug, id })

  return (
    <PageLayout loading={isLoading} skeleton={simplePageSkeleton({ titleWidth: 160 })}>
      {data.title != null && <title>{expandDateMentions(String(data.title))}</title>}
      {page ? (
        <SupabasePageResolverProvider
          pages={[]}
          pageTypes={pageTypes}
          relatedPages={relatedPages}
          pickerPageTypeSlug={targetSlug}
        >
          <PageLayout.Content className="max-w-[710px]!">
            <div className="flex flex-col gap-4">
              <PageCover coverUrl={coverUrl} onChange={handleCoverChange} />
              <div className="flex items-center gap-2">
                <IconPicker value={displayIconName} onChange={handleIconChange} />
                <InlineEditableText
                  value={String(data.title ?? "")}
                  displayValue={expandDateMentions(String(data.title ?? ""))}
                  onChange={handleTitleChange}
                  placeholder="Untitled Page"
                  validate={(v) => (v.trim().length === 0 ? "Title is required" : null)}
                  className={PAGE_TITLE_CLASSES}
                />
                {targetSlug != null && (
                  <div className="ml-auto">
                    <PageDetailHeaderMenu
                      pageTypeSlug={toPageTypeSlug(targetSlug)}
                      pageId={id}
                      isFavorite={data.favoritedAt != null}
                    />
                  </div>
                )}
              </div>

              <ToggleSection label="Properties" defaultOpen>
                <PageDetailProperties
                  definitions={propertyListDefs}
                  data={dataWithComputed}
                  pageId={id}
                  pageTypeSlug={targetSlug ?? undefined}
                  onPropertyChange={handlePropertyChange}
                  onPageNavigate={handlePageNavigate}
                />
              </ToggleSection>

              {targetSlug != null &&
                richDocumentDefs.map((def) => {
                  const body = data[def.id]
                  const blocks = isRecord(body) && Array.isArray(body.blocks) ? body.blocks : []
                  return (
                    <ToggleSection
                      key={def.id}
                      label={def.title}
                      defaultOpen
                      hasContent={blocks.length > 0}
                    >
                      <BlockEditor
                        pageTypeSlug={targetSlug}
                        id={id}
                        propertyId={def.id}
                        value={body}
                      />
                    </ToggleSection>
                  )
                })}

              {multiRelationDefs.map((def) => (
                <ToggleSection
                  key={def.id}
                  label={def.title}
                  hasContent={hasValue(dataWithComputed[def.id])}
                >
                  <BadgeLayoutProvider truncate="fluid" popoverAlign="start" display={def.display}>
                    <MultiRelationPropertyBadge
                      property={def}
                      value={dataWithComputed[def.id] ?? null}
                      context="detail"
                      editable
                      onPropertyChange={handlePropertyChange}
                      onPageNavigate={handlePageNavigate}
                    />
                  </BadgeLayoutProvider>
                </ToggleSection>
              ))}

              {markdownDefs.map((def) => {
                const val = data[def.id]
                const str = val != null && typeof val !== "object" ? String(val) : null
                return (
                  <ToggleSection
                    key={def.id}
                    label={def.title}
                    hasContent={str != null && str.length > 0}
                  >
                    {str != null ? (
                      <MarkdownRenderer content={str} />
                    ) : (
                      <span className="text-sm text-tertiary">Empty</span>
                    )}
                  </ToggleSection>
                )
              })}

              {jsonDefs.map((def) => (
                <ToggleSection key={def.id} label={def.title} hasContent={hasValue(data[def.id])}>
                  <JsonSectionRenderer value={data[def.id]} />
                </ToggleSection>
              ))}

              <PageDetailReferrers
                pageId={id}
                pageTypeId={pageTypeId}
                pageTypePropertiesMap={pageTypePropertiesMap}
                pageTypeSlugById={pageTypeSlugById}
              />

              <PageDetailSubpages
                pageId={id}
                pageTypePropertiesMap={pageTypePropertiesMap}
                pageTypeSlugById={pageTypeSlugById}
                definitions={allDefinitions}
              />
            </div>
          </PageLayout.Content>
        </SupabasePageResolverProvider>
      ) : (
        <PageLayout.Content>
          <Empty>
            <EmptyHeader>
              <EmptyTitle>Page not found</EmptyTitle>
              <EmptyDescription>This page doesn't exist or may have been deleted.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        </PageLayout.Content>
      )}
    </PageLayout>
  )
}
