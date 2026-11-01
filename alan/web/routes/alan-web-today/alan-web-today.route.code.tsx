import {
  capacityHoursOf,
  capacityIn,
} from "akasha/alan/harness/capacity/modules/hours/capacity-hours.computed-property-module.code.ts"
import { mountainWallAt } from "akasha/alan/harness/day-boundary/modules/mountain-wall/mountain-wall.module.code.ts"
import { whereReadBy } from "akasha/alan/harness/web-page-answer/modules/reader-access/reader-access.module.code.ts"
import { stretchHours } from "akasha/alan/track/daily/day/modules/stretch-hours/stretch-hours.computed-property-module.code.ts"
import { readAlanUser } from "akasha/alan/web/.server/alan-session-reader/alan-session-reader.module.code.ts"
import { dayNow } from "akasha/command/pages/track/modules/session-rows/session-rows.module.code.ts"
import { formatTime12h } from "akasha/design/interface/form/modules/format-time/format-time.module.code.ts"
import {
  PageLayout,
  PageTitle,
} from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  TableTotalCell,
} from "akasha/design/interface/primitive/modules/table/table.module.code.tsx"
import { askingFor } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import { toPageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import { padTwo } from "akasha/text/writing/modules/pad-two/pad-two.computed-property-module.code.ts"
import { data, redirect } from "react-router"

const DAY = toPageTypeSlug("day")

const MINUTES_IN_AN_HOUR = 60

const NOT_STATED = "—"

const MINUS = "−"

const CAPACITY_PLACES = 1

type Values = Readonly<Record<string, unknown>>

type Session = {
  readonly id: string
  readonly title: string
  readonly from: string
  readonly to: string | null
  readonly hours: number
  readonly safety: string | null
  readonly difficulty: string | null
  readonly capacity: number | null
}

type TodayLoaderData = {
  readonly date: string
  readonly sessions: readonly Session[]
  readonly hours: number
  readonly capacity: number | null
}

function textAt(row: Values, key: string): string | null {
  const held = row[key]
  return typeof held === "string" && held !== "" ? held : null
}

function clockOf(at: string): string {
  const wall = mountainWallAt(new Date(at))
  return formatTime12h(`${padTwo(wall.hour)}:${padTwo(wall.minute)}`)
}

function sessionOf(row: Values, now: Date): Session | null {
  const id = textAt(row, "id")
  const title = textAt(row, "title")
  const startedAt = textAt(row, "startedAt")
  if (id === null || title === null || startedAt === null) return null
  const endedAt = textAt(row, "endedAt")
  return {
    id,
    title,
    from: clockOf(startedAt),
    to: endedAt === null ? null : clockOf(endedAt),
    hours: stretchHours(startedAt, endedAt, now.toISOString()) ?? 0,
    safety: textAt(row, "safetyLevel"),
    difficulty: textAt(row, "difficultyLevel"),
    capacity: capacityHoursOf(
      {
        title,
        "started-at": startedAt,
        "ended-at": endedAt,
        "safety-level": row["safetyLevel"],
        "difficulty-level": row["difficultyLevel"],
      },
      now
    ),
  }
}

function sessionsIn(held: unknown, now: Date): readonly Session[] {
  if (!Array.isArray(held)) return []
  return held.flatMap((one: unknown) => {
    if (one === null || typeof one !== "object") return []
    const session = sessionOf(one as Values, now)
    return session === null ? [] : [session]
  })
}

function todayOf(date: string, sessions: readonly Session[]): TodayLoaderData {
  return {
    date,
    sessions,
    hours: sessions.reduce((sum, one) => sum + one.hours, 0),
    capacity: capacityIn(
      sessions.map((one) => ({ values: { "health-capacity-hours": one.capacity } }))
    ),
  }
}

function dateSaid(date: string): string {
  const [year, month, day] = date.split("-").map(Number)
  if (year === undefined || month === undefined || day === undefined) return date
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-US", {
    timeZone: "UTC",
    weekday: "long",
    month: "long",
    day: "numeric",
  })
}

function durationSaid(hours: number): string {
  const minutes = Math.round(hours * MINUTES_IN_AN_HOUR)
  const whole = Math.floor(minutes / MINUTES_IN_AN_HOUR)
  const left = minutes % MINUTES_IN_AN_HOUR
  if (whole === 0) return `${left}m`
  return `${whole}h ${padTwo(left)}m`
}

function tenthsOf(capacity: number): number {
  const scale = 10 ** CAPACITY_PLACES
  const rounded = Math.round(capacity * scale) / scale
  return rounded === 0 ? 0 : rounded
}

function capacitySaid(capacity: number | null): string {
  if (capacity === null) return NOT_STATED
  const tenths = tenthsOf(capacity)
  const size = Math.abs(tenths).toFixed(CAPACITY_PLACES)
  if (tenths > 0) return `+${size}`
  if (tenths < 0) return `${MINUS}${size}`
  return size
}

function capacityTone(capacity: number | null): string {
  if (capacity === null) return "text-tertiary"
  const tenths = tenthsOf(capacity)
  if (tenths > 0) return "text-green"
  if (tenths < 0) return "text-red"
  return "text-secondary"
}

export function meta() {
  return [{ title: "Today" }]
}

export async function loader({ request }: { request: Request }) {
  const { user } = await readAlanUser(request)
  if (user === null) throw redirect("/sign-in")
  const now = new Date()
  const date = dayNow(now)
  const held = await whereReadBy(user, DAY, { date: { is: date } })
  if ("refused" in held) return data(todayOf(date, []))
  const asked = await askingFor({ pageTypeSlug: DAY, where: held.where, keys: ["sessions"] })
  if ("refused" in asked) throw new Error(`today's sessions went unread: ${asked.refused}`)
  return data(todayOf(date, sessionsIn(asked.rows[0]?.["sessions"], now)))
}

function LevelCell({ level }: { level: string | null }) {
  return (
    <TableCell className={cn(level === null && "text-tertiary")}>{level ?? NOT_STATED}</TableCell>
  )
}

function SessionRow({ session }: { session: Session }) {
  return (
    <TableRow className="border-primary/5 border-b last:border-b-0">
      <TableCell className="whitespace-normal py-3 text-left font-sans">
        <span className="block font-medium text-primary">{session.title}</span>
        <span className="block text-tertiary text-xs">
          {session.from} {"–"} {session.to ?? "now"}
        </span>
      </TableCell>
      <TableCell>{durationSaid(session.hours)}</TableCell>
      <LevelCell level={session.safety} />
      <LevelCell level={session.difficulty} />
      <TableCell className={capacityTone(session.capacity)}>
        {capacitySaid(session.capacity)}
      </TableCell>
    </TableRow>
  )
}

function Heading({ short, full }: { short: string; full: string }) {
  return (
    <TableHead>
      <span className="min-[584px]:hidden" title={full}>
        {short}
      </span>
      <span className="hidden min-[584px]:inline">{full}</span>
    </TableHead>
  )
}

export default function TodayRoute({ loaderData }: { loaderData: TodayLoaderData }) {
  return (
    <PageLayout>
      <PageLayout.Header>
        <PageTitle>Today</PageTitle>
        <p className="mt-1 text-secondary text-sm">{dateSaid(loaderData.date)}</p>
      </PageLayout.Header>
      <PageLayout.Content>
        {loaderData.sessions.length === 0 ? (
          <p className="text-secondary text-sm">No session is tracked today yet.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-primary/5 border-b">
                <TableHead className="text-left">Session</TableHead>
                <TableHead>Duration</TableHead>
                <Heading short="S" full="Safety" />
                <Heading short="D" full="Difficulty" />
                <TableHead>Capacity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loaderData.sessions.map((session) => (
                <SessionRow key={session.id} session={session} />
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableTotalCell className="text-left font-sans text-primary">Total</TableTotalCell>
                <TableTotalCell>{durationSaid(loaderData.hours)}</TableTotalCell>
                <TableTotalCell />
                <TableTotalCell />
                <TableTotalCell className={capacityTone(loaderData.capacity)}>
                  {capacitySaid(loaderData.capacity)}
                </TableTotalCell>
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </PageLayout.Content>
    </PageLayout>
  )
}
