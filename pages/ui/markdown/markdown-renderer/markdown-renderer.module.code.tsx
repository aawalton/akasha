"use client"

import { cn } from "@akasha/design-primitives/cn"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { useSurface } from "@akasha/design-primitives/surface-provider"
import { MentionChip } from "@akasha/pages-ui/markdown/mention-chip"
import type { MentionResolver } from "@akasha/pages-ui/markdown/remark-mentions"
import { remarkMentions } from "@akasha/pages-ui/markdown/remark-mentions"
import { remarkSectionize } from "@akasha/pages-ui/markdown/remark-sectionize"
import type { ReactNode } from "react"
import { useMemo } from "react"
import type { Components } from "react-markdown"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

function asString(value: unknown): string {
  return typeof value === "string" ? value : ""
}

function asOptionalString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined
}

function spaceYForDepth(depthAttr: string | undefined): string {
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

const DEFAULT_COMPONENTS: Components = {
  section: ({ children, className, ...rest }) => {
    const restRecord: Readonly<Record<string, unknown>> = rest
    const depthAttr = asOptionalString(restRecord["data-depth"])
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
  a: ({ children, href }) => (
    <a href={href} className="text-accent underline" target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
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
          mentionType={asString(props.mentionType)}
          mentionId={asString(props.mentionId)}
          mentionAnchor={asOptionalString(props.mentionAnchor)}
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
