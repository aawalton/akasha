import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@akasha/design-forms/input-group"
import { PageLayout, PageTitle } from "@akasha/design-layout/page-layout"
import { Button } from "@akasha/design-primitives/button"
import { Card } from "@akasha/design-primitives/card"
import { Search } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router"
import {
  addResponseSchema,
  type PlaceCandidate,
  searchResponseSchema,
} from "../place-candidate/place-candidate.module.code.ts"

export function meta() {
  return [{ title: "Search places — Atlas" }]
}

type AddState = "idle" | "adding" | { href: string } | "error"

function candidateKey(candidate: PlaceCandidate): string {
  return candidate.sourcePlaceId
}

export default function SearchRoute() {
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
      const res = await fetch("/api/places/add", {
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
        <PageTitle>Search places</PageTitle>
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
                placeholder="Search for a place by name or address"
                aria-label="Search for a place"
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  type="submit"
                  variant="primary"
                  disabled={searchState === "searching" || query.trim().length === 0}
                >
                  {searchState === "searching" ? "Searching…" : "Search"}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </form>

          {searchState === "error" ? (
            <p className="text-secondary text-sm">Search failed. Please try again.</p>
          ) : null}

          {searchState !== "error" && hasSearched && candidates.length === 0 ? (
            <p className="text-secondary text-sm">No places found.</p>
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
                        View location
                      </Link>
                    ) : (
                      <Button
                        type="button"
                        variant="primary"
                        onClick={() => addPlace(candidate)}
                        disabled={addState === "adding"}
                        className="shrink-0"
                      >
                        {addState === "adding" ? "Adding…" : addState === "error" ? "Retry" : "Add"}
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
