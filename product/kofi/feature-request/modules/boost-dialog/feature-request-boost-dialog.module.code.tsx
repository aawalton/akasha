"use client"

import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "akasha/design/interface/primitive/modules/dialog/dialog.module.code.tsx"
import { Input } from "akasha/design/interface/primitive/modules/input/input.module.code.tsx"
import { Label } from "akasha/design/interface/primitive/modules/label/label.module.code.tsx"
import { Spinner } from "akasha/design/interface/primitive/modules/spinner/spinner.module.code.tsx"
import { readPagesAgain } from "akasha/page/ui-store/modules/singleton/singleton.module.code.ts"
import { featureRequest } from "akasha/product/kofi/feature-request/feature-request.page-type.ts"
import { postedTo } from "akasha/product/kofi/feature-request/modules/posting/feature-request-posting.module.code.ts"
import { useState } from "react"

const POINTS = "feature-request-points"

const BOOSTED =
  "Your points are behind this request. They stay there until Alan builds it or denies it."

export type Boosting = { readonly slug: string; readonly ask: string }

function heldSays(balance: number | null): string {
  return balance === null ? "" : `You hold ${balance} points.`
}

export function BoostDialog({
  boosting,
  onOpenChange,
  postTo,
  balance,
}: {
  readonly boosting: Boosting | null
  readonly onOpenChange: (open: boolean) => void
  readonly postTo: string
  readonly balance: number | null
}): React.ReactNode {
  const [said, setSaid] = useState("")
  const [working, setWorking] = useState(false)
  const [refused, setRefused] = useState<string | null>(null)
  const [boosted, setBoosted] = useState(false)

  const close = () => {
    onOpenChange(false)
    setSaid("")
    setWorking(false)
    setRefused(null)
    setBoosted(false)
  }

  const send = async () => {
    if (boosting === null) return
    setWorking(true)
    setRefused(null)
    const landed = await postedTo(postTo, {
      act: "boost",
      request: boosting.slug,
      points: said,
    })
    setWorking(false)
    if ("refused" in landed) {
      setRefused(landed.refused)
      return
    }
    setBoosted(true)
    void readPagesAgain(featureRequest.slug)
  }

  return (
    <Dialog
      open={boosting !== null}
      onOpenChange={(next) => {
        if (next) onOpenChange(true)
        else close()
      }}
    >
      <DialogContent showCloseButton>
        <DialogHeader>
          <DialogTitle>Boost this request</DialogTitle>
        </DialogHeader>
        <DialogBody>
          {boosted ? (
            <p className="text-secondary text-sm">{BOOSTED}</p>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="text-secondary text-sm">{boosting?.ask ?? ""}</p>
              <Label htmlFor={POINTS}>How many points?</Label>
              <Input
                id={POINTS}
                type="number"
                min={1}
                value={said}
                disabled={working}
                onChange={(event) => setSaid(event.target.value)}
              />
              <p className="text-secondary text-sm">{heldSays(balance)}</p>
              {refused !== null && (
                <p role="alert" className="text-red text-sm">
                  {refused}
                </p>
              )}
            </div>
          )}
        </DialogBody>
        <DialogFooter>
          {boosted ? (
            <Button variant="accent" onClick={close}>
              Done
            </Button>
          ) : (
            <>
              <Button variant="tertiary" onClick={close} disabled={working}>
                Cancel
              </Button>
              <Button
                variant="accent"
                disabled={working || said.trim() === ""}
                onClick={() => {
                  void send()
                }}
              >
                {working ? (
                  <>
                    <Spinner />
                    Boosting...
                  </>
                ) : (
                  "Boost it"
                )}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
