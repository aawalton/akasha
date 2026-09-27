import { ATLAS_APP } from "akasha/alan/atlas-web/modules/atlas-app-id/atlas-app-id.module.code.ts"
import {
  addResponseSchema,
  type PlaceCandidate,
  searchResponseSchema,
} from "akasha/alan/atlas-web/modules/place-candidate/place-candidate.module.code.ts"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "akasha/design/interface/form/modules/input-group/input-group.module.code.tsx"
import {
  PageLayout,
  PageTitle,
} from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import { Card } from "akasha/design/interface/primitive/modules/card/card.module.code.tsx"
import {
  type DocumentData,
  metaUnderSite,
  SITE_DOCUMENT,
  siteDocumentAt,
} from "akasha/infrastructure/service/akasha-service/web-app/site-document/modules/reading/site-document-reading.module.code.ts"
import { usePhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/modules/reading/web-phrase-reading.module.code.tsx"
import { atlasSearchAdd } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/atlas-search-add.web-phrase.ts"
import { atlasSearchAdding } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/atlas-search-adding.web-phrase.ts"
import { atlasSearchButton } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/atlas-search-button.web-phrase.ts"
import { atlasSearchFailed } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/atlas-search-failed.web-phrase.ts"
import { atlasSearchLabel } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/atlas-search-label.web-phrase.ts"
import { atlasSearchNone } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/atlas-search-none.web-phrase.ts"
import { atlasSearchPlaceholder } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/atlas-search-placeholder.web-phrase.ts"
import { atlasSearchRetry } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/atlas-search-retry.web-phrase.ts"
import { atlasSearchSearching } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/atlas-search-searching.web-phrase.ts"
import { atlasSearchViewLocation } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/atlas-search-view-location.web-phrase.ts"
import { useLoaderFollowing } from "akasha/page/ui/modules/loader-following/loader-following.module.code.ts"
import { Search } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router"

const READ = [SITE_DOCUMENT]

export const meta = metaUnderSite

export async function loader(): Promise<DocumentData> {
  return { document: await siteDocumentAt(ATLAS_APP, "search") }
}

function addSays(addState: AddState): string {
  if (addState === "adding") return atlasSearchAdding.slug
  return addState === "error" ? atlasSearchRetry.slug : atlasSearchAdd.slug
}

type AddState = "idle" | "adding" | { href: string } | "error"

function candidateKey(candidate: PlaceCandidate): string {
  return candidate.sourcePlaceId
}

export default function SearchRoute({ loaderData }: { loaderData: DocumentData }) {
  useLoaderFollowing(READ)
  const phrase = usePhrase()
  const [query, setQuery] = useState("")
  const [candidates, setCandidates] = useState<PlaceCandidate[]>([])
  const [searchState, setSearchState] = useState<"idle" | "searching" | "error">("idle")
  const [hasSearched, setHasSearched] = useState(false)
  const [addStates, setAddStates] = useState<Record<string, AddState>>({})

  async function runSearch(e: React.FormEvent) {
    e.preventDefault()
    const text = query.trim()
    if (text.length === 0) return
    setSearchState("searching")
    setHasSearched(true)
    setAddStates({})
    try {
      const res = await fetch(`/api/places/search?q=${encodeURIComponent(text)}`)
      if (!res.ok) {
        setSearchState("error")
        setCandidates([])
        return
      }
      const raw: unknown = await res.json()
      const parsed = searchResponseSchema.safeParse(raw)
      if (!parsed.success) {
        setSearchState("error")
        setCandidates([])
        return
      }
      setCandidates(parsed.data.candidates)
      setSearchState("idle")
    } catch {
      setSearchState("error")
      setCandidates([])
    }
  }

  async function addPlace(candidate: PlaceCandidate) {
    const key = candidateKey(candidate)
    setAddStates((prev) => ({ ...prev, [key]: "adding" }))
    try {
      const res = await fetch("/api/alan/collections/places/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(candidate),
      })
      if (!res.ok) {
        setAddStates((prev) => ({ ...prev, [key]: "error" }))
        return
      }
      const raw: unknown = await res.json()
      const parsed = addResponseSchema.safeParse(raw)
      if (!parsed.success) {
        setAddStates((prev) => ({ ...prev, [key]: "error" }))
        return
      }
      setAddStates((prev) => ({ ...prev, [key]: { href: parsed.data.href } }))
    } catch {
      setAddStates((prev) => ({ ...prev, [key]: "error" }))
    }
  }

  return (
    <PageLayout>
      <PageLayout.Header>
        <PageTitle>{loaderData.document.title}</PageTitle>
      </PageLayout.Header>
      <PageLayout.Content>
        <div className="mx-auto flex max-w-2xl flex-col gap-4 py-6">
          <form onSubmit={runSearch}>
            <InputGroup>
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              <InputGroupInput
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={phrase(atlasSearchPlaceholder.slug)}
                aria-label={phrase(atlasSearchLabel.slug)}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  type="submit"
                  variant="primary"
                  disabled={searchState === "searching" || query.trim().length === 0}
                >
                  {phrase(
                    searchState === "searching" ? atlasSearchSearching.slug : atlasSearchButton.slug
                  )}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </form>

          {searchState === "error" ? (
            <p className="text-secondary text-sm">{phrase(atlasSearchFailed.slug)}</p>
          ) : null}

          {searchState !== "error" && hasSearched && candidates.length === 0 ? (
            <p className="text-secondary text-sm">{phrase(atlasSearchNone.slug)}</p>
          ) : null}

          <ul className="flex flex-col gap-3">
            {candidates.map((candidate) => {
              const key = candidateKey(candidate)
              const addState = addStates[key] ?? "idle"
              const added = typeof addState === "object" ? addState : null
              return (
                <li key={key}>
                  <Card className="flex items-center justify-between gap-4 p-4">
                    <div className="min-w-0">
                      <p className="truncate font-medium text-primary">{candidate.name}</p>
                      {candidate.address.length > 0 ? (
                        <p className="truncate text-secondary text-sm">{candidate.address}</p>
                      ) : null}
                      {candidate.category != null ? (
                        <p className="truncate text-tertiary text-xs">{candidate.category}</p>
                      ) : null}
                    </div>
                    {added != null ? (
                      <Link to={added.href} className="shrink-0 text-accent text-sm underline">
                        {phrase(atlasSearchViewLocation.slug)}
                      </Link>
                    ) : (
                      <Button
                        type="button"
                        variant="primary"
                        onClick={() => addPlace(candidate)}
                        disabled={addState === "adding"}
                        className="shrink-0"
                      >
                        {phrase(addSays(addState))}
                      </Button>
                    )}
                  </Card>
                </li>
              )
            })}
          </ul>
        </div>
      </PageLayout.Content>
    </PageLayout>
  )
}
