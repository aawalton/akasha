"use client"

import { parseString } from "akasha/code/type/narrowing/modules/parse-string/parse-string.module.code.ts"
import { stringIn } from "akasha/code/type/narrowing/modules/string-in/string-in.module.code.ts"
import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import { flattenRow } from "akasha/page/access/modules/routing-core/routing-core.module.code.ts"
import { addressIn, namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { lowerKebabCase } from "akasha/page/name-format/pages/lower-kebab-case/lower-kebab-case.name-format.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"
import {
  useAcquireShapes,
  usePipelineLive,
} from "akasha/page/ui/cache/modules/tanstack-live/tanstack-live.module.code.ts"
import { buildPageTypeSlugMaps } from "akasha/page/ui/component/modules/view-tab-content-href/view-tab-content-href.module.code.ts"
import {
  addressOf,
  scopeKeysIn,
} from "akasha/page/ui/component/view-engine/modules/build-page-resolver/build-page-resolver.module.code.ts"
import { MentionChip } from "akasha/page/ui/markdown/modules/mention-chip/mention-chip.module.code.tsx"
import type { MentionResolver } from "akasha/page/ui/markdown/modules/remark-mentions/remark-mentions.module.code.ts"
import { remarkMentions } from "akasha/page/ui/markdown/modules/remark-mentions/remark-mentions.module.code.ts"
import { remarkSectionize } from "akasha/page/ui/markdown/modules/remark-sectionize/remark-sectionize.module.code.ts"
import { toPageWithProperties } from "akasha/page/ui/supabase/modules/page-with-properties/page-with-properties.module.code.ts"
import type { PageRow } from "akasha/page/ui-store/collection/modules/page-row/page-row.module.code.ts"
import { namedShapeDescriptor } from "akasha/page/ui-store/collection/modules/shape-descriptor/shape-descriptor.module.code.ts"
import {
  createRelatedPipeline,
  type RelatedNaming,
} from "akasha/page/ui-store/query/modules/related-pipeline/related-pipeline.module.code.ts"
import { pageLinkOf } from "akasha/page/url/modules/page-href/page-href.module.code.ts"
import { toPageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import type { ReactNode } from "react"
import { useMemo } from "react"
import type { Components } from "react-markdown"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

function spaceYForDepth(depthAttr: string | null): string {
  switch (depthAttr) {
    case "1":
      return "space-y-6"
    case "2":
      return "space-y-4"
    case "3":
      return "space-y-3"
    default:
      return "space-y-2"
  }
}

function CodeSpan({ className, children }: { className?: string; children?: ReactNode }) {
  const surface = useSurface()
  const isBlock = className?.includes("language-")
  if (isBlock) {
    return <code className={className}>{children}</code>
  }
  return (
    <code
      className={cn(
        "rounded px-1 py-0.5 font-mono text-primary text-xs",
        surfaceClass(surface + 1)
      )}
    >
      {children}
    </code>
  )
}

function PreBlock({ children }: { children?: ReactNode }) {
  const surface = useSurface()
  return (
    <pre
      className={cn(
        "whitespace-pre-wrap break-words rounded-md p-3 text-xs",
        surfaceClass(surface + 1)
      )}
    >
      {children}
    </pre>
  )
}

type PageNamed = {
  readonly pageTypeSlug: string
  readonly scope: string | null
  readonly slug: string
}

export function pageNamedIn(href: string | undefined): PageNamed | null {
  if (href === undefined) return null
  const address = addressIn(href)
  if (address.kind === "id" || address.kind === "bare") return null
  const scope = address.kind === "scoped" ? address.scope : null
  const parts = [address.pageTypeSlug, ...(scope === null ? [] : [scope]), address.slug]
  if (!parts.every((part) => lowerKebabCase(part))) return null
  return { pageTypeSlug: address.pageTypeSlug, scope, slug: address.slug }
}

export function readingHrefOf(named: PageNamed, rows: readonly PageRow[]): string | null {
  const flat = rows.map((row) => flattenRow(row))
  const pages = flat.map((page) => toPageWithProperties(page))
  const { slugById } = buildPageTypeSlugMaps(pages)
  const scopeKeys = scopeKeysIn(pages)
  const address = namedAs(named.pageTypeSlug, named.slug, named.scope)
  const found = flat[pages.findIndex((page) => addressOf(page, slugById, scopeKeys) === address)]
  if (found === undefined) return null
  return pageLinkOf(found, toPageTypeSlug(named.pageTypeSlug))?.href ?? null
}

function useReadingHref(named: PageNamed): string | null {
  const namings = useMemo<readonly RelatedNaming[]>(
    () => [
      { pageTypeSlug: named.pageTypeSlug, by: "slug", values: [named.slug] },
      { pageTypeSlug: pageType.slug, by: "slug", values: [named.pageTypeSlug] },
    ],
    [named.pageTypeSlug, named.slug]
  )
  const shapes = useMemo(
    () => namings.map((one) => namedShapeDescriptor(one.pageTypeSlug, one)),
    [namings]
  )
  useAcquireShapes(shapes)
  const { snapshot } = usePipelineLive(
    (collection) => createRelatedPipeline(collection, namings),
    JSON.stringify(namings),
    true
  )
  return snapshot === null ? null : readingHrefOf(named, snapshot)
}

function PageLink({ named, children }: { named: PageNamed; children?: ReactNode }) {
  const href = useReadingHref(named)
  if (href === null) return <>{children}</>
  return (
    <a href={href} className="text-accent underline">
      {children}
    </a>
  )
}

function MarkdownLink({ children, href }: { children?: ReactNode; href?: string }) {
  const named = pageNamedIn(href)
  if (named !== null) return <PageLink named={named}>{children}</PageLink>
  return (
    <a href={href} className="text-accent underline" target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

const DEFAULT_COMPONENTS: Components = {
  section: ({ children, className, ...rest }) => {
    const restRecord: Readonly<Record<string, unknown>> = rest
    const depthAttr = stringIn(restRecord["data-depth"])
    return (
      <section className={cn(spaceYForDepth(depthAttr), className)} {...rest}>
        {children}
      </section>
    )
  },
  h1: ({ children }) => <h1 className="font-bold text-lg text-primary">{children}</h1>,
  h2: ({ children }) => <h2 className="font-bold text-base text-primary">{children}</h2>,
  h3: ({ children }) => <h3 className="font-semibold text-primary text-sm">{children}</h3>,
  p: ({ children }) => <p className="text-primary text-sm">{children}</p>,
  ul: ({ children }) => <ul className="list-disc space-y-1 pl-4 text-sm">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal space-y-1 pl-4 text-sm">{children}</ol>,
  li: ({ children }) => <li className="text-primary">{children}</li>,
  code: CodeSpan,
  pre: PreBlock,
  blockquote: ({ children }) => (
    <blockquote className="border-surface-3 border-l-2 pl-3 text-secondary italic">
      {children}
    </blockquote>
  ),
  a: MarkdownLink,
  table: ({ children }) => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-surface-2 border-b px-2 py-1 text-left font-semibold text-primary">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-surface-2 border-b px-2 py-1 text-primary">{children}</td>
  ),
  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
}

export function MarkdownRenderer({
  content,
  resolver,
  components,
  className,
}: {
  content: string
  resolver?: MentionResolver
  components?: Components
  className?: string
}) {
  const merged = useMemo<Components>(() => {
    const mentionComponent = {
      mention: (props: Record<string, unknown>) => (
        <MentionChip
          mentionType={parseString(props.mentionType)}
          mentionId={parseString(props.mentionId)}
          mentionAnchor={stringIn(props.mentionAnchor) ?? undefined}
          resolver={resolver}
        />
      ),
    }
    return { ...DEFAULT_COMPONENTS, ...mentionComponent, ...components }
  }, [resolver, components])

  const rendered = useMemo(
    () => (
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMentions, remarkSectionize]}
        components={merged}
      >
        {content}
      </ReactMarkdown>
    ),
    [content, merged]
  )

  return <div className={cn("space-y-6", className)}>{rendered}</div>
}
