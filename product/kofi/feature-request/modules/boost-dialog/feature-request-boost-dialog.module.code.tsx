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
import { usePhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/modules/reading/web-phrase-reading.module.code.tsx"
import { dialogCancel } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/dialog-cancel.web-phrase.ts"
import { dialogDone } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/dialog-done.web-phrase.ts"
import { featureRequestBoostButton } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/feature-request-boost-button.web-phrase.ts"
import { featureRequestBoostPointsLabel } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/feature-request-boost-points-label.web-phrase.ts"
import { featureRequestBoostTitle } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/feature-request-boost-title.web-phrase.ts"
import { featureRequestBoosted } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/feature-request-boosted.web-phrase.ts"
import { featureRequestBoosting } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/feature-request-boosting.web-phrase.ts"
import { featureRequestPointsHeld } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/feature-request-points-held.web-phrase.ts"
import { readPagesAgain } from "akasha/page/ui-store/modules/singleton/singleton.module.code.ts"
import { featureRequest } from "akasha/product/kofi/feature-request/feature-request.page-type.ts"
import { postedTo } from "akasha/product/kofi/feature-request/modules/posting/feature-request-posting.module.code.ts"
import { useState } from "react"

const POINTS = "feature-request-points"

export type Boosting = { readonly slug: string; readonly ask: string }

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
  const phrase = usePhrase()
  const heldSays = balance === null ? "" : phrase(featureRequestPointsHeld.slug, { balance })
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
          <DialogTitle>{phrase(featureRequestBoostTitle.slug)}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          {boosted ? (
            <p className="text-secondary text-sm">{phrase(featureRequestBoosted.slug)}</p>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="text-secondary text-sm">{boosting?.ask ?? ""}</p>
              <Label htmlFor={POINTS}>{phrase(featureRequestBoostPointsLabel.slug)}</Label>
              <Input
                id={POINTS}
                type="number"
                min={1}
                value={said}
                disabled={working}
                onChange={(event) => setSaid(event.target.value)}
              />
              <p className="text-secondary text-sm">{heldSays}</p>
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
              {phrase(dialogDone.slug)}
            </Button>
          ) : (
            <>
              <Button variant="tertiary" onClick={close} disabled={working}>
                {phrase(dialogCancel.slug)}
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
                    {phrase(featureRequestBoosting.slug)}
                  </>
                ) : (
                  phrase(featureRequestBoostButton.slug)
                )}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
