import { alan } from "akasha/alan/alan.domain.ts"
import { alanContributor } from "akasha/alan/web/.server/alan-session-reader/alan-session-reader.module.code.ts"
import { PageTitle } from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import { Input } from "akasha/design/interface/primitive/modules/input/input.module.code.tsx"
import { Label } from "akasha/design/interface/primitive/modules/label/label.module.code.tsx"
import { Textarea } from "akasha/design/interface/primitive/modules/textarea/textarea.module.code.tsx"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { PROPOSAL_COST } from "akasha/product/kofi/contribution-point/modules/spending/contribution-point-spending.module.code.ts"
import { listingFor } from "akasha/product/kofi/feature-request/modules/listing/feature-request-listing.module.code.ts"
import {
  balanceHeldBy,
  boostedBy,
  proposedBy,
} from "akasha/product/kofi/feature-request/modules/writing/feature-request-writing.module.code.ts"
import { featureRequestAsk } from "akasha/product/kofi/feature-request/properties/feature-request-ask.text-property.ts"
import { Form } from "react-router"

const PRODUCT = namedAs("domain", alan.slug, null)

const ACT = "act"

const PROPOSE = "propose"

const BOOST = "boost"

const ASK = "ask"

const REQUEST = "request"

const POINTS = "points"

const SIGNED_OUT = "sign in to open a request or to boost one"

const NOTHING_TO_DO = "this form says nothing to do"

export function meta() {
  return [
    { title: "Feature requests — Alan Walton" },
    {
      name: "description",
      content: "The feature requests published for alanwalton.com, most points first.",
    },
  ]
}

export async function loader({ request }: { request: Request }) {
  const listing = await listingFor(PRODUCT)
  const contributor = await alanContributor(request)
  const balance = contributor === null ? null : await balanceHeldBy(contributor)
  return { requests: listing.requests, signedIn: contributor !== null, balance }
}

function parseSaid(said: FormDataEntryValue | null): string {
  return typeof said === "string" ? said : ""
}

type Answered = {
  readonly act: string
  readonly request: string
  readonly refused: string | null
  readonly opened: string | null
}

export async function action({ request }: { request: Request }): Promise<Answered> {
  const contributor = await alanContributor(request)
  const form = await request.formData()
  const act = parseSaid(form.get(ACT))
  const named = parseSaid(form.get(REQUEST))
  if (contributor === null) {
    return { act, request: named, refused: SIGNED_OUT, opened: null }
  }
  if (act === PROPOSE) {
    const landed = await proposedBy({
      product: PRODUCT,
      contributor,
      ask: parseSaid(form.get(ASK)),
    })
    if ("refused" in landed) return { act, request: named, refused: landed.refused, opened: null }
    return { act, request: named, refused: null, opened: landed.slug }
  }
  if (act === BOOST) {
    const landed = await boostedBy({
      product: PRODUCT,
      contributor,
      request: named,
      points: Number(parseSaid(form.get(POINTS))),
    })
    if ("refused" in landed) return { act, request: named, refused: landed.refused, opened: null }
    return { act, request: named, refused: null, opened: null }
  }
  return { act, request: named, refused: NOTHING_TO_DO, opened: null }
}

type RequestsLoaderData = Awaited<ReturnType<typeof loader>>

function Refused({ said }: { said: string | null }) {
  if (said === null) return null
  return (
    <p className="text-red text-sm" role="alert">
      {said}
    </p>
  )
}

function refusedOver(answered: Answered | undefined, act: string, named: string): string | null {
  if (answered === undefined || answered.act !== act) return null
  if (act === BOOST && answered.request !== named) return null
  return answered.refused
}

function heldSays(balance: number | null): string {
  if (balance === null) return "What you hold went unread just now."
  return `You hold ${balance} points, and opening a request costs ${PROPOSAL_COST}.`
}

export default function AlanWebRequestsRoute({
  loaderData,
  actionData,
}: {
  loaderData: RequestsLoaderData
  actionData?: Answered
}) {
  const { requests, signedIn } = loaderData
  const opened = actionData === undefined ? null : actionData.opened
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <div className="space-y-6">
        <header className="space-y-2">
          <PageTitle>Feature requests</PageTitle>
          <p className="text-secondary text-sm">
            What people have asked Alan to build, and the contribution points behind each ask.
          </p>
        </header>

        {signedIn ? (
          <section className="space-y-2">
            <p className="text-secondary text-sm">{heldSays(loaderData.balance)}</p>
            <Form method="post" className="space-y-2">
              <input type="hidden" name={ACT} value={PROPOSE} />
              <Label htmlFor={ASK}>What do you want Alan to build?</Label>
              <Textarea id={ASK} name={ASK} maxLength={featureRequestAsk.maxLength} />
              <Button type="submit" variant="primary">
                Open a request for {PROPOSAL_COST} points
              </Button>
            </Form>
            {opened === null ? null : (
              <p className="text-secondary text-sm">
                Your request is proposed, and Alan publishes it or denies it himself.
              </p>
            )}
            <Refused said={refusedOver(actionData, PROPOSE, "")} />
          </section>
        ) : null}

        {requests.length === 0 ? (
          <p className="text-secondary text-sm">Nothing has been published here yet.</p>
        ) : (
          <ul className="space-y-6">
            {requests.map((one) => (
              <li key={one.id} className="space-y-1">
                <h2 className="font-semibold text-base text-primary">{one.title}</h2>
                <p className="text-secondary text-sm">{one.ask}</p>
                <p className="text-secondary text-sm">
                  {one.points} {one.points === 1 ? "point" : "points"} behind it, from{" "}
                  {one.boosters} {one.boosters === 1 ? "booster" : "boosters"}
                </p>
                {signedIn ? (
                  <Form method="post" className="flex items-center gap-2">
                    <input type="hidden" name={ACT} value={BOOST} />
                    <input type="hidden" name={REQUEST} value={one.slug} />
                    <Label className="sr-only" htmlFor={`${POINTS}-${one.slug}`}>
                      Points
                    </Label>
                    <Input
                      className="w-24"
                      id={`${POINTS}-${one.slug}`}
                      name={POINTS}
                      type="number"
                      min={1}
                      step={1}
                    />
                    <Button type="submit">Boost it</Button>
                  </Form>
                ) : null}
                <Refused said={refusedOver(actionData, BOOST, one.slug)} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}
