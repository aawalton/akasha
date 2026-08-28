"use client"

import { BadgeLayoutProvider } from "@shared/design-badges/components/badge-layout-context"
import { InlineEditableText } from "@shared/design-forms/components/inline-editable-text"
import { PageLayout } from "@shared/design-layout/components/page-layout"
import { PAGE_TITLE_CLASSES } from "@shared/design-layout/components/page-layout-data"
import { simplePageSkeleton } from "@shared/design-layout/components/skeleton-presets"
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@shared/design-patterns/components/empty"
import { IconPicker } from "@shared/design-patterns/components/icon-picker"
import { expandDateMentions } from "@shared/pages-core/view/expand-date-mentions"
import { PageTypeSlug } from "@shared/pages-url"
import { isRecord } from "@shared/utils-narrow/is-record"
import { BlockEditor } from "../block-editor/block-editor"
import { MarkdownRenderer } from "../markdown/markdown-renderer"
import { MultiRelationPropertyBadge } from "../property-types/multi-relation"
import { SupabasePageResolverProvider } from "../supabase/page-resolver-provider"
import { PageCover } from "./page-cover"
import { PageDetailHeaderMenu } from "./page-detail-header-menu"
import { PageDetailProperties } from "./page-detail-properties"
import { PageDetailReferrers } from "./page-detail-referrers"
import { hasValue, JsonSectionRenderer, ToggleSection } from "./page-detail-sections"
import { PageDetailSubpages } from "./page-detail-subpages"
import { usePageDefaultContent } from "./use-page-default-content"

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
    handleReorderProperties,
    handleCreateOption,
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
                      pageTypeSlug={PageTypeSlug(targetSlug)}
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
                  onReorderDefinitions={handleReorderProperties}
                  onCreateOption={handleCreateOption}
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
