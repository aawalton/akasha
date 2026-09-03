import { Heading } from "@akasha/design-primitives/heading"
import { Text } from "@akasha/design-primitives/text-body"
import { ExternalLink, FileSpreadsheet, Gauge, NotebookPen, Presentation } from "lucide-react"
import { Link } from "react-router"

type ResourceLink = {
  href: string
  label: string
  description: string
  external: boolean
  icon: typeof Presentation
}

const RESOURCES: readonly ResourceLink[] = [
  {
    href: "/autcon-2026",
    label: "AutCon 2026 — Making Every Spoon Count",
    description: "Three mental models for tracking autistic energy, simple to instrumented.",
    external: false,
    icon: Presentation,
  },
  {
    href: "/safety-levels",
    label: "Safety Levels",
    description: "The 8-row anchor table for Alan's Safety scale.",
    external: false,
    icon: Gauge,
  },
  {
    href: "https://docs.google.com/spreadsheets/d/1KR1xMg8LbwwHiSfS8-2eSrb0t4xKVgn0kgnfuvz4zuY/",
    label: "Google Sheets template",
    description:
      "Starter scaffolds at all three levels — Spoon Counting, Stoplight, Resource Bars.",
    external: true,
    icon: FileSpreadsheet,
  },
  {
    href: "https://cool-crocus-712.notion.site/Making-Every-Spoon-Count-Templates-3605cf0bf24a808a9ae6fb09aa0af644",
    label: "Notion template",
    description:
      "Starter scaffolds at all three levels — Spoon Counting, Stoplight, Resource Bars.",
    external: true,
    icon: NotebookPen,
  },
]

export function ResourceList(): React.JSX.Element {
  return (
    <ul className="space-y-6">
      {RESOURCES.map((resource) => {
        const Icon = resource.icon
        const linkProps = resource.external
          ? {
              to: resource.href,
              target: "_blank",
              rel: "noopener noreferrer",
              reloadDocument: true,
            }
          : { to: resource.href }
        return (
          <li key={resource.label}>
            <Link
              {...linkProps}
              className="flex cursor-pointer items-center gap-4 [&_h3]:cursor-pointer [&_p]:cursor-pointer"
            >
              <Icon className="size-6 shrink-0 text-accent" aria-hidden />
              <div className="flex flex-col gap-1">
                <Heading
                  variant="subsection-accent"
                  as="h3"
                  className="flex items-center gap-2 text-xl"
                >
                  {resource.label}
                  {resource.external ? (
                    <ExternalLink className="size-4 text-accent" aria-hidden />
                  ) : null}
                </Heading>
                <Text variant="prose" className="text-base">
                  {resource.description}
                </Text>
              </div>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
