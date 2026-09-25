import { PageLayout } from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { Heading } from "akasha/design/interface/primitive/modules/heading/heading.module.code.tsx"
import { Separator } from "akasha/design/interface/primitive/modules/separator/separator.module.code.tsx"
import { Text } from "akasha/design/interface/primitive/modules/text-body/text-body.module.code.tsx"
import type {
  DrawnPoint,
  DrawnSlide,
  PointColor,
  PointIcon,
} from "akasha/infrastructure/service/akasha-service/web-app/site-document/slide/modules/reading/slide-reading.module.code.ts"
import { Brain, Code, Gauge, HeartPulse } from "lucide-react"
import { useCallback, useEffect, useState } from "react"

const POINT_ICONS: Record<PointIcon, typeof Brain> = {
  brain: Brain,
  code: Code,
  "heart-pulse": HeartPulse,
  gauge: Gauge,
}

const POINT_FILL: Record<PointColor, string> = {
  red: "bg-red",
  yellow: "bg-yellow",
  green: "bg-green",
  blue: "bg-blue",
}

const NO_FILL = "bg-white/25"

function parseHashIndex(raw: string, total: number): number {
  const n = Number(raw.replace(/^#/, ""))
  return Number.isInteger(n) && n >= 0 && n < total ? n : 0
}

export function DeckPageContent({
  slides,
  venue,
}: {
  slides: readonly DrawnSlide[]
  venue: string | null
}) {
  const total = slides.length
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const sync = () => setIndex(parseHashIndex(window.location.hash, total))
    sync()
    window.addEventListener("hashchange", sync)
    return () => window.removeEventListener("hashchange", sync)
  }, [total])

  const go = useCallback(
    (next: number) => {
      if (next < 0 || next >= total) return
      setIndex(next)
      const target = `#${next}`
      if (window.location.hash !== target) {
        window.history.replaceState(null, "", target)
      }
    },
    [total]
  )

  useEffect(() => {
    const slide = slides[index]
    if (slide != null) {
      document.title = venue === null ? slide.title : `${slide.title} — ${venue}`
    }
  }, [index, slides, venue])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return
      }
      switch (event.key) {
        case "ArrowRight":
        case " ":
        case "j":
          event.preventDefault()
          go(index + 1)
          break
        case "ArrowLeft":
        case "k":
          event.preventDefault()
          go(index - 1)
          break
        case "Home":
          event.preventDefault()
          go(0)
          break
        case "End":
          event.preventDefault()
          go(total - 1)
          break
        default:
          return
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [go, index, total])

  const slide = slides[index]
  if (!slide) return null

  return (
    <PageLayout>
      <div className="mx-auto hidden min-h-screen w-full max-w-4xl flex-col gap-10 px-6 pt-20 pb-12 sm:flex">
        <div className="flex-1">{renderSlide(slide)}</div>
      </div>
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-16 px-6 py-12 sm:hidden">
        {slides.map((s, i) => (
          <section key={s.number} className="flex flex-col gap-16">
            {renderSlide(s)}
            {i < slides.length - 1 ? <Separator /> : null}
          </section>
        ))}
      </div>
    </PageLayout>
  )
}

function renderSlide(slide: DrawnSlide) {
  switch (slide.kind) {
    case "title":
      return <TitleSlideView slide={slide} />
    case "about":
      return <AboutSlideView slide={slide} />
    case "agenda":
      return <AgendaSlideView slide={slide} />
    case "level":
      return <LevelSlideView slide={slide} />
    case "cta":
      return <CtaSlideView slide={slide} />
    default:
      throw new Error("unexpected slide kind")
  }
}

function SlideTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <Heading variant="subsection" as="h2" className="font-bold text-4xl text-primary">
        {children}
      </Heading>
      <Separator className="w-24 bg-accent" />
    </div>
  )
}

function TitleSlideView({ slide }: { slide: DrawnSlide }) {
  const [presenter, venue] = slide.points
  return (
    <div className="flex h-full flex-col justify-center gap-12">
      <div className="flex flex-col gap-6">
        <Heading variant="subsection" as="h2" className="font-bold text-6xl text-primary">
          {slide.title}
        </Heading>
        {slide.lead === null ? null : (
          <Heading variant="subsection-accent" className="text-2xl">
            {slide.lead}
          </Heading>
        )}
      </div>
      <div className="space-y-1">
        {presenter === undefined ? null : (
          <Text variant="prose" className="text-lg">
            {presenter.title}
          </Text>
        )}
        {venue === undefined ? null : (
          <Text variant="caption" className="text-base">
            {venue.title}
          </Text>
        )}
      </div>
    </div>
  )
}

function AboutSlideView({ slide }: { slide: DrawnSlide }) {
  return (
    <div className="flex flex-col gap-10 sm:flex-row sm:items-start">
      <div className="flex flex-1 flex-col gap-12">
        <SlideTitle>{slide.title}</SlideTitle>
        <ul className="space-y-12">
          {slide.points.map((point) => {
            const Icon = point.icon === null ? null : POINT_ICONS[point.icon]
            return (
              <li key={point.title} className="flex items-center gap-4">
                {Icon === null ? null : (
                  <Icon className="size-7 shrink-0 text-accent" aria-hidden />
                )}
                <Text variant="prose" className="text-xl">
                  <span className="font-bold text-primary">{point.value}</span> {point.title}
                </Text>
              </li>
            )
          })}
        </ul>
      </div>
      {slide.image === null ? null : (
        <img
          src={slide.image}
          alt={slide.imageCaption ?? ""}
          width={320}
          height={427}
          className="rounded-xl object-cover shadow-lg"
        />
      )}
    </div>
  )
}

function AgendaSlideView({ slide }: { slide: DrawnSlide }) {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-8">
        <SlideTitle>{slide.title}</SlideTitle>
        <ol className="space-y-6">
          {slide.points.map((point) => (
            <li key={point.title} className="flex items-baseline gap-6">
              <Heading variant="subsection-accent" className="w-24 shrink-0 text-xl">
                {point.value}
              </Heading>
              <div className="space-y-1">
                <Heading
                  variant="subsection"
                  as="h3"
                  className="font-semibold text-2xl text-primary"
                >
                  {point.title}
                </Heading>
                <Text variant="prose" className="text-base">
                  {point.description}
                </Text>
              </div>
            </li>
          ))}
        </ol>
      </div>
      {slide.closer === null ? null : (
        <Text variant="prose" className="text-base">
          {slide.closer}
        </Text>
      )}
    </div>
  )
}

function BatteryIcon({ colorClass, fill }: { colorClass: string; fill: number }) {
  const pct = Math.max(0, Math.min(1, fill)) * 100
  return (
    <div className="flex items-center" aria-hidden>
      <div className="relative h-3 w-6 rounded-[2px] border border-white/25 p-[1px]">
        <div className={`h-full rounded-[1px] ${colorClass}`} style={{ width: `${pct}%` }} />
      </div>
      <div className="h-1 w-0.5 rounded-r-[1px] bg-white/25" />
    </div>
  )
}

function StoplightCircle({ colorClass }: { colorClass: string }) {
  return <div className={`size-4 rounded-full ${colorClass}`} aria-hidden />
}

function PointMark({ point }: { point: DrawnPoint }) {
  const colorClass = point.color === null ? NO_FILL : POINT_FILL[point.color]
  if (point.fill !== null) return <BatteryIcon colorClass={colorClass} fill={point.fill} />
  return <StoplightCircle colorClass={colorClass} />
}

function LevelSlideView({ slide }: { slide: DrawnSlide }) {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <SlideTitle>{slide.title}</SlideTitle>
          {slide.lead === null ? null : (
            <Heading variant="subsection-accent" className="text-2xl">
              {slide.lead}
            </Heading>
          )}
        </div>
        {slide.points.length === 0 ? null : (
          <div className="space-y-6">
            {slide.points.map((point) => (
              <div key={point.title} className="flex items-start gap-3">
                <div className="flex h-7 items-center">
                  <PointMark point={point} />
                </div>
                <div>
                  <div className="font-semibold text-lg text-primary">{point.title}</div>
                  {(point.description ?? "").split(" = ").map((term) => (
                    <Text key={term} variant="prose" className="text-base">
                      {`⇒ ${term}`}
                    </Text>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function CtaSlideView({ slide }: { slide: DrawnSlide }) {
  return (
    <div className="flex flex-col gap-8">
      <SlideTitle>{slide.title}</SlideTitle>
      <div className="flex flex-col gap-10 sm:flex-row sm:items-start">
        <div className="flex-1 space-y-6">
          {slide.points.map((point) => (
            <div key={point.title} className="space-y-1">
              <Heading variant="subsection-accent" className="text-2xl">
                {point.title}
              </Heading>
              {point.description === null ? null : (
                <Text variant="prose" className="text-base">
                  {point.description}
                </Text>
              )}
            </div>
          ))}
        </div>
        {slide.image === null ? null : (
          <div className="flex flex-col items-center gap-2">
            <img
              src={slide.image}
              alt={`QR code for ${slide.imageCaption ?? ""}`}
              width={240}
              height={240}
              className="rounded-lg bg-white p-3"
            />
            <Text variant="caption" className="text-sm">
              {slide.imageCaption}
            </Text>
          </div>
        )}
      </div>
    </div>
  )
}
