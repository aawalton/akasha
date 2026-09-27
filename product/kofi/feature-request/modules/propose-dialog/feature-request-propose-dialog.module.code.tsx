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
import { Label } from "akasha/design/interface/primitive/modules/label/label.module.code.tsx"
import { Spinner } from "akasha/design/interface/primitive/modules/spinner/spinner.module.code.tsx"
import { Textarea } from "akasha/design/interface/primitive/modules/textarea/textarea.module.code.tsx"
import { usePhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/modules/reading/web-phrase-reading.module.code.tsx"
import { dialogCancel } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/dialog-cancel.web-phrase.ts"
import { dialogDone } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/dialog-done.web-phrase.ts"
import { featureRequestAskLabel } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/feature-request-ask-label.web-phrase.ts"
import { featureRequestCosts } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/feature-request-costs.web-phrase.ts"
import { featureRequestOpenButton } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/feature-request-open-button.web-phrase.ts"
import { featureRequestOpenTitle } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/feature-request-open-title.web-phrase.ts"
import { featureRequestOpened } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/feature-request-opened.web-phrase.ts"
import { featureRequestOpening } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/feature-request-opening.web-phrase.ts"
import { featureRequestPointsHeld } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/feature-request-points-held.web-phrase.ts"
import { readPagesAgain } from "akasha/page/ui-store/modules/singleton/singleton.module.code.ts"
import { PROPOSAL_COST } from "akasha/product/kofi/contribution-point/modules/spending/contribution-point-spending.module.code.ts"
import { featureRequest } from "akasha/product/kofi/feature-request/feature-request.page-type.ts"
import { postedTo } from "akasha/product/kofi/feature-request/modules/posting/feature-request-posting.module.code.ts"
import { featureRequestAsk } from "akasha/product/kofi/feature-request/properties/feature-request-ask.text-property.ts"
import { useState } from "react"

const ASK = "feature-request-ask"

export function ProposeDialog({
  open,
  onOpenChange,
  postTo,
  balance,
  onProposed,
}: {
  readonly open: boolean
  readonly onOpenChange: (open: boolean) => void
  readonly postTo: string
  readonly balance: number | null
  readonly onProposed?: (slug: string) => void
}): React.ReactNode {
  const phrase = usePhrase()
  const costs = phrase(featureRequestCosts.slug, { cost: PROPOSAL_COST })
  const heldSays =
    balance === null ? costs : `${phrase(featureRequestPointsHeld.slug, { balance })} ${costs}`
  const [ask, setAsk] = useState("")
  const [working, setWorking] = useState(false)
  const [refused, setRefused] = useState<string | null>(null)
  const [opened, setOpened] = useState(false)

  const close = () => {
    onOpenChange(false)
    setAsk("")
    setWorking(false)
    setRefused(null)
    setOpened(false)
  }

  const send = async () => {
    setWorking(true)
    setRefused(null)
    const landed = await postedTo(postTo, { act: "propose", ask })
    setWorking(false)
    if ("refused" in landed) {
      setRefused(landed.refused)
      return
    }
    onProposed?.(landed.slug)
    setOpened(true)
    void readPagesAgain(featureRequest.slug)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (next) onOpenChange(true)
        else close()
      }}
    >
      <DialogContent showCloseButton>
        <DialogHeader>
          <DialogTitle>{phrase(featureRequestOpenTitle.slug)}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          {opened ? (
            <p className="text-secondary text-sm">{phrase(featureRequestOpened.slug)}</p>
          ) : (
            <div className="flex flex-col gap-2">
              <Label htmlFor={ASK}>{phrase(featureRequestAskLabel.slug)}</Label>
              <Textarea
                id={ASK}
                value={ask}
                disabled={working}
                maxLength={featureRequestAsk.maxLength}
                onChange={(event) => setAsk(event.target.value)}
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
          {opened ? (
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
                disabled={working || ask.trim() === ""}
                onClick={() => {
                  void send()
                }}
              >
                {working ? (
                  <>
                    <Spinner />
                    {phrase(featureRequestOpening.slug)}
                  </>
                ) : (
                  phrase(featureRequestOpenButton.slug, { cost: PROPOSAL_COST })
                )}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
